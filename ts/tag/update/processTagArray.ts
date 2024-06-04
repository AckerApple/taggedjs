import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { Tag } from '../Tag.class.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ArrayNoKeyError } from '../../errors.js'
import { destroyArrayTag } from '../checkDestroyPrevious.function.js'
import { newTagSupportByTemplater, setupNewSupport, tagFakeTemplater } from './processTag.function.js'
import { TagSupport } from '../TagSupport.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { isTagClass } from '../../isInstance.js'
import { TagSubject } from '../../subject.types.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'

export type LastArrayItem = {
  tagSupport: TagSupport
  index: number
  deleted?: boolean
}

export type TagArraySubject = ValueSubject<Tag[]> & {
  insertBefore: InsertBefore // template tag
  placeholder?: Text // template tag
  lastArray?: LastArrayItem[] // previous array that may have been processed
}

export function processTagArray(
  subject: TagArraySubject,
  value: (TemplaterResult | Tag)[], // arry of Tag classes
  insertBefore: InsertBefore, // <template end interpolate />
  ownerSupport: TagSupport,
  options: {
    counts: Counts
  },
): InsertBefore[] {
  const clones: InsertBefore[] = ownerSupport.clones // []
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

    if(lessLength) {
      destroyArrayItem(lastArray, index, options)
      ++removed
      return false
    }

    const subTag = value[index - removed] as Tag | TemplaterResult | undefined
    const tagClass = isTagClass(subTag)

    let tag = subTag as Tag
    let templater = (subTag as Tag).templater
    let prevArrayValue: unknown

    if(tagClass) {
      prevArrayValue = tag.memory.arrayValue
    } else {
      templater = subTag as TemplaterResult
      tag = templater.tag as Tag
      prevArrayValue = templater.arrayValue
    }

    // const tag = subTag?.templater.tag as Tag
    const lastTag = item.tagSupport.templater.tag as Tag
    const lastArrayValue = lastTag.memory.arrayValue
    const destroyItem = !areLikeValues(prevArrayValue, lastArrayValue)
    
    if(destroyItem) {
      destroyArrayItem(lastArray, index, options)
      ++removed
      return false
    }

    return true
  })

  const length = value.length
  for (let index=0; index < length; ++index) {
    const item = value[index]
    const previous = lastArray[index]
    const previousSupport = previous?.tagSupport
    const subTag = item as Tag | TemplaterResult
    const tagClass = isTagClass(subTag)
    const itemSubject = new ValueSubject(undefined) as unknown as TagSubject

    let templater = (subTag as Tag).templater
    let tagSupport: TagSupport

    if(tagClass) {
      if(!templater) {
        templater = tagFakeTemplater(subTag as Tag)
      }
      
      tagSupport = new TagSupport(
        templater,
        ownerSupport,
        itemSubject
      )
    } else {
      templater = subTag as TemplaterResult
      tagSupport = setupNewTemplater(
        templater, ownerSupport, itemSubject
      )
    }

    if(previousSupport) {
      setupNewSupport(tagSupport as TagSupport, ownerSupport, previousSupport.subject)
      const global = previousSupport.global
      tagSupport.global = global
      global.newest = tagSupport
    }
    
    // check for html``.key()
    const tag = templater.tag || subTag as Tag
    const keySet = 'arrayValue' in tag.memory
    if (!keySet) {
      const details = {
        template: tagSupport.getTemplate().string,
        array: value,
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
      continue
    }

    processAddTagArrayItem(
      runtimeInsertBefore,
      tagSupport,
      index,
      options,
      lastArray,
    )

    ownerSupport.childTags.push(tagSupport)  
  }

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

  const fragment = document.createDocumentFragment()
  const newTempElm = document.createElement('template')
  fragment.appendChild(newTempElm)

  tagSupport.buildBeforeElement(
    newTempElm, // before,
    {counts}
  )

  const parent = before.parentNode as ParentNode
  parent.insertBefore(fragment, before)
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

function setupNewTemplater(
  templater: TemplaterResult,
  ownerSupport: TagSupport,
  itemSubject: TagSubject
) {
  const tagSupport = newTagSupportByTemplater(templater, ownerSupport, itemSubject)
  renderTagOnly(tagSupport, tagSupport, itemSubject, ownerSupport)
  return tagSupport
}

function destroyArrayItem(
  lastArray: LastArrayItem[],
  index: number,
  options: {
    counts: Counts
  }
) {
  const last = lastArray[index]
  const tagSupport = last.tagSupport
  destroyArrayTag(tagSupport, options.counts)
  last.deleted = true

  ++options.counts.removed
}
