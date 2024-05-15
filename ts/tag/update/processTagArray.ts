import { Clones, InsertBefore } from '../../interpolations/Clones.type'
import { Tag } from '../Tag.class'
import { ValueSubject } from '../../subject/ValueSubject'
import { Counts } from '../../interpolations/interpolateTemplate'
import { ArrayNoKeyError } from '../../errors'
import { destroyArrayTag } from '../checkDestroyPrevious.function'
import { setupNewTemplater, tagFakeTemplater } from './processTag.function'
import { TagSupport } from '../TagSupport.class'
import { TemplaterResult } from '../../TemplaterResult.class'
import { isTagClass } from '../../isInstance'
import { TagSubject } from '../../subject.types'

export type LastArrayItem = {
  tagSupport: TagSupport
  index: number
  deleted?: boolean
}

export type TagArraySubject = ValueSubject<Tag[]> & {
  insertBefore: InsertBefore // template tag
  placeholder?: Text // template tag
  lastArray?: LastArrayItem[] // previous array that may have been processed
  isChildSubject?: boolean // present when children passed as prop0 or prop1
}

export function processTagArray(
  subject: TagArraySubject,
  value: (TemplaterResult | Tag)[], // arry of Tag classes
  insertBefore: InsertBefore, // <template end interpolate />
  ownerSupport: TagSupport,
  options: {
    counts: Counts
    forceElement?: boolean
  },
): Clones {
  const clones: Clones = ownerSupport.clones // []
  let lastArray = subject.lastArray = subject.lastArray || []

  if(!subject.placeholder) {
    setPlaceholderElm(insertBefore, subject)
  }

  const runtimeInsertBefore = subject.placeholder as Text // || insertBefore

  let removed = 0
  
  /** 🗑️ remove previous items first */
  lastArray = subject.lastArray = subject.lastArray.filter((
    item: LastArrayItem,
    index: number,
  ) => {
    const newLength = value.length-1
    const at = index - removed
    const lessLength = newLength < at
    const subValue = value[index - removed]
    const subTag = subValue as Tag | undefined

    // const tag = subTag?.templater.tag as Tag
    const lastTag = item.tagSupport.templater.tag as Tag
    const newArrayValue = subTag?.memory.arrayValue
    const lastArrayValue = lastTag.memory.arrayValue
    const destroyItem = lessLength || !areLikeValues(newArrayValue, lastArrayValue)
    
    if(destroyItem) {
      const last = lastArray[index]
      const tagSupport = last.tagSupport
      destroyArrayTag(tagSupport, options.counts)
      last.deleted = true

      ++removed
      ++options.counts.removed
      
      return false
    }

    return true
  })

  value.forEach((item, index) => {
    const previous = lastArray[index]
    const previousSupport = previous?.tagSupport
    const subTag = item as Tag

    if(isTagClass(subTag) && !subTag.templater) {
      tagFakeTemplater(subTag)
    }

    const tagSupport: TagSupport = new TagSupport(
      subTag.templater,
      ownerSupport,
      new ValueSubject(undefined) as unknown as TagSubject
    )
    
    // tagSupport.templater = subTag.templater

    if(previousSupport) {
      setupNewTemplater(tagSupport as TagSupport, ownerSupport, previousSupport.subject)
      const global = previousSupport.global
      tagSupport.global = global
      global.newest = tagSupport
    }
    
    // check for html``.key()
    const keySet = 'arrayValue' in subTag.memory
    if (!keySet) {
      const details = {
        template: tagSupport.getTemplate().string,
        array: value,
        ownerTagContent: ownerSupport.lastTemplateString,
      }
      const message = 'Use html`...`.key(item) instead of html`...` to template an Array'
      console.error(message, details)
      const err = new ArrayNoKeyError(message, details)
      throw err
    }
    
    const couldBeSame = lastArray.length > index
    if (couldBeSame) {
      const prevSupport = previous.tagSupport
      const prevGlobal = prevSupport.global
      
      // subTag.tagSupport = subTag.tagSupport || prevSupport
      const oldest = prevGlobal.oldest as TagSupport
      oldest.updateBy(tagSupport)
      return []
    }

    processAddTagArrayItem(
      runtimeInsertBefore,
      tagSupport,
      index,
      options,
      lastArray,
    )

    ownerSupport.childTags.push(tagSupport)  
  })

  return clones
}

function setPlaceholderElm(
  insertBefore: InsertBefore,
  subject: TagArraySubject,
) {
  if(insertBefore.nodeName !== 'TEMPLATE') {
    subject.placeholder = insertBefore as Text
    return
  }

  const placeholder = subject.placeholder = document.createTextNode('')
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(placeholder, insertBefore)
  parentNode.removeChild(insertBefore)
}


function processAddTagArrayItem(
  before: Text,
  tagSupport: TagSupport,
  index: number,
  options: {
    counts: Counts
    forceElement?: boolean
  },
  lastArray: LastArrayItem[],
) {
  const lastValue = {
    tagSupport, index
  }
  
  // Added to previous array
  lastArray.push(lastValue)

  const counts: Counts = {
    added: options.counts.added + index,
    removed: options.counts.removed,
  }

  const newTempElm = document.createElement('template')
  const parent = before.parentNode as ParentNode
  parent.insertBefore(newTempElm, before)

  tagSupport.buildBeforeElement(
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
