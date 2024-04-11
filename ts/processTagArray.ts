import { Clones, InsertBefore } from './Clones.type'
import { Tag } from './Tag.class'
import { ValueSubject } from './subject/ValueSubject'
import { Counts } from './interpolateTemplate'
import { ArrayNoKeyError } from './errors'
import { destroyArrayTag, restoreTagMarker } from './checkDestroyPrevious.function'
import { TagSubject } from './Tag.utils'
import { applyFakeTemplater } from './processTag.function'
import { insertAfter } from './insertAfter.function'

export type LastArrayItem = {
  tag: Tag
  index: number
  deleted?: boolean
}

export type TagArraySubject = ValueSubject<Tag[]> & {
  insertBefore: InsertBefore // template tag
  placeholderElm?: InsertBefore // The template tag never stays behind, this element lets us know where to draw back to
  parentAsPlaceholder?: ParentNode // Used when a tag creates no content and  parent has no content

  lastArray?: LastArrayItem[] // previous array that may have been processed
  isChildSubject?: boolean // present when children passed as prop0 or prop1
}

export function processTagArray(
  subject: TagArraySubject,
  value: Tag[], // arry of Tag classes
  insertBefore: InsertBefore, // <template end interpolate />
  ownerTag: Tag,
  options: {
    counts: Counts
    forceElement?: boolean
  },
): Clones {
  const clones: Clones = ownerTag.clones // []
  let lastArray = subject.lastArray = subject.lastArray || []

  if(subject.placeholderElm) {
    const parentPlaceholder = subject.parentAsPlaceholder
    if(parentPlaceholder) {
      parentPlaceholder.appendChild(insertBefore)
      delete subject.placeholderElm
    } else {
      insertAfter(insertBefore, subject.placeholderElm)
    }
    delete subject.placeholderElm
  }

  let removed = 0
  
  /** 🗑️ remove previous items first */
  lastArray = subject.lastArray = subject.lastArray.filter((
    item: any,
    index: number,
  ) => {
    const newLength = value.length-1
    const at = index - removed
    const lessLength = newLength < at
    const subTag = value[index - removed]
    const subArrayValue = subTag?.memory.arrayValue
    const tag = item.tag as Tag
    const destroyItem = lessLength || !areLikeValues(subArrayValue, tag.memory.arrayValue)
    
    if(destroyItem) {
      const last = lastArray[index]
      const tag: Tag = last.tag
      destroyArrayTag(tag, options.counts)
      last.deleted = true

      ++removed
      ++options.counts.removed
      
      return false
    }

    return true
  })

  // const masterBefore = template || (template as any).clone
  const before = insertBefore // || (subject.value as any).insertBefore || (insertBefore as any).clone

  value.forEach((subTag, index) => {
    const previous = lastArray[index]
    const previousSupport = previous?.tag.tagSupport
    const fakeSubject = new ValueSubject({} as Tag) as unknown as TagSubject
    
    applyFakeTemplater(subTag, ownerTag, fakeSubject)

    if(previousSupport) {
      subTag.tagSupport.templater.global = previousSupport.templater.global
      previousSupport.templater.global.newest = subTag
    }
    
    // check for html``.key()
    const keySet = 'arrayValue' in subTag.memory
    if (!keySet) {
      const details = {
        template: subTag.getTemplate().string,
        array: value,
        ownerTagContent: ownerTag.lastTemplateString,
      }
      const message = 'Use html`...`.key(item) instead of html`...` to template an Array'
      console.error(message, details)
      const err = new ArrayNoKeyError(message, details)
      throw err
    }
    
    const couldBeSame = lastArray.length > index
    if (couldBeSame) {
      const prevSupport = previous.tag.tagSupport
      const prevGlobal = prevSupport.templater.global
      const isSame = areLikeValues(
        previous.tag.memory.arrayValue,
        subTag.memory.arrayValue,
      )

      if (isSame) {
        subTag.tagSupport = subTag.tagSupport || prevSupport
        const oldest = prevGlobal.oldest as Tag
        oldest.updateByTag(subTag)
        return []
      }

      // TODO: should not get here?
      processAddTagArrayItem(
        before, subTag, index, options, lastArray
      )
      throw new Error('item should be back')
      // return [] // removed: item should have been previously deleted and will be added back
    }

    processAddTagArrayItem(
      before,
      subTag,
      index,
      options,
      lastArray,
    )

    ownerTag.childTags.push(subTag)  
  })

  if(value.length) {
    const lastClone = insertBefore.previousSibling as ChildNode
    setPlaceholderElm(lastClone, insertBefore, subject)
  } else {
    const placeholderElm = insertBefore.previousSibling

    if(placeholderElm) {
      setPlaceholderElm(placeholderElm, insertBefore, subject)
    } else {
      const parentNode = insertBefore.parentNode as ParentNode
      setPlaceholderElm(
        parentNode as InsertBefore,
        insertBefore,
        subject
      )
      subject.parentAsPlaceholder = parentNode
    }
  }

  return clones
}

function setPlaceholderElm(
  lastClone: InsertBefore,
  insertBefore: InsertBefore,
  subject: TagArraySubject,
) {
  subject.placeholderElm = lastClone
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.removeChild(insertBefore)
}


function processAddTagArrayItem(
  before: InsertBefore,
  subTag: Tag,
  index: number,
  options: {
    counts: Counts
    forceElement?: boolean
  },
  lastArray: LastArrayItem[],
) {
  const lastValue = {
    tag: subTag, index
  }
  
  // Added to previous array
  lastArray.push(lastValue)

  const counts: Counts = {
    added: options.counts.added + index,
    removed: options.counts.removed,
  }

  if(!before.parentNode) {
    throw new Error('issue adding array item')
  }

  const newTempElm = document.createElement('template')
  before.parentNode.insertBefore(newTempElm, before)

  subTag.buildBeforeElement(
    newTempElm, // before,
    {counts, forceElement: options.forceElement}
  )
}

/** compare two values. If both values are arrays then the items will be compared */
function areLikeValues(valueA: unknown, valueB: unknown): Boolean {
  if(valueA === valueB) {
    return true
  }

  const bothArrays = valueA instanceof Array && valueB instanceof Array
  const matchLengths = bothArrays && valueA.length == valueB.length
  if(matchLengths) {
    return valueA.every((item, index) => item == valueB[index])
  }

  return false
}
