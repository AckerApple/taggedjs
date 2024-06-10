import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { Tag, TagTemplate } from '../Tag.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ArrayNoKeyError } from '../../errors.js'
import { destroyArrayTag } from '../checkDestroyPrevious.function.js'
import { newSupportByTemplater, setupNewSupport, tagFakeTemplater } from './processTag.function.js'
import { Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { isTagClass } from '../../isInstance.js'
import { TagSubject } from '../../subject.types.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { TagJsSubject } from './TagJsSubject.class.js'
import { textNode } from '../ValueTypes.enum.js'

export type LastArrayItem = {
  support: Support
  index: number
  deleted?: boolean
}

type LastArrayMeta = {
  array: LastArrayItem[]
  lastRun?: TagTemplate
}

export type TagArraySubject = TagJsSubject<Tag[]> & {
  insertBefore: InsertBefore // template tag
  lastArray?: LastArrayMeta // previous array that may have been processed
}

export function processTagArray(
  subject: TagArraySubject,
  value: (TemplaterResult | Tag)[], // arry of Tag classes
  insertBefore: InsertBefore, // <template end interpolate />
  ownerSupport: Support,
  options: {
    counts: Counts
  },
  fragment?: DocumentFragment,
): InsertBefore[] {
  const clones: InsertBefore[] = ownerSupport.subject.global.clones // []
  let lastArray = subject.lastArray = subject.lastArray || {array: []}

  if(!subject.global.placeholder) {
    setPlaceholderElm(insertBefore, subject)
  }

  const runtimeInsertBefore = subject.global.placeholder as Text

  let removed = 0
  
  /** 🗑️ remove previous items first */
  lastArray.array = lastArray.array.filter((
    item: LastArrayItem,
    index: number,
  ) => {
    const newLength = value.length-1
    const at = index - removed
    const lessLength = newLength < at

    if(lessLength) {
      destroyArrayItem(lastArray.array, index, options)
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
    const lastTag = item.support.templater.tag as Tag
    const lastArrayValue = lastTag.memory.arrayValue
    const destroyItem = !areLikeValues(prevArrayValue, lastArrayValue)
    
    if(destroyItem) {
      destroyArrayItem(lastArray.array, index, options)
      ++removed
      return false
    }

    return true
  })

  const length = value.length
  for (let index=0; index < length; ++index) {
    const item = value[index]
    const previous = lastArray.array[index]
    const previousSupport = previous?.support
    const subTag = item as Tag | TemplaterResult
    const tagClass = isTagClass(subTag)
    const itemSubject = new TagJsSubject(
      // runtimeInsertBefore,
      undefined
    ) as unknown as TagSubject
    itemSubject.lastRun = lastArray.lastRun

    let templater = (subTag as Tag).templater
    let support: Support

    if(tagClass) {
      if(!templater) {
        templater = tagFakeTemplater(subTag as Tag)
      }
      
      support = new Support(
        templater,
        ownerSupport,
        itemSubject
      )
    } else {
      templater = subTag as TemplaterResult
      support = setupNewTemplater(
        templater, ownerSupport, itemSubject
      )
    }

    // share global between old and new
    if(previousSupport) {
      const prevSubject = previousSupport.subject
      const global = prevSubject.global
      setupNewSupport(support as Support, ownerSupport, prevSubject)
      support.subject.global = global
      global.newest = support
    } else {
      setupNewSupport(support, ownerSupport, itemSubject)
    }
    
    // check for html``.key()
    const tag = templater.tag || subTag as Tag
    const keySet = 'arrayValue' in tag.memory
    if (!keySet) {
      const details = {
        template: support.getTemplate().string,
        array: value,
      }
      const message = 'Use html`...`.key(item) instead of html`...` to template an Array'
      console.error(message, details)
      const err = new ArrayNoKeyError(message, details)
      throw err
    }
    
    const couldBeSame = lastArray.array.length > index
    if (couldBeSame) {
      const prevSupport = previous.support
      const prevGlobal = prevSupport.subject.global
      const oldest = prevGlobal.oldest as Support  
      oldest.updateBy(support)
      continue
    }

    processAddTagArrayItem(
      runtimeInsertBefore as any,
      support,
      index,
      options,
      lastArray.array,
      fragment,
    )
    lastArray.lastRun = support.subject.lastRun

    ownerSupport.subject.global.childTags.push(support)  
  }

  return clones
}

function setPlaceholderElm(
  insertBefore: InsertBefore,
  subject: TagArraySubject,
) {
  const placeholder = subject.global.placeholder = textNode.cloneNode(false) as Text
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(placeholder, insertBefore)
  parentNode.removeChild(insertBefore)
}

function processAddTagArrayItem(
  before: Text,
  support: Support,
  index: number,
  options: {
    counts: Counts
  },
  lastArray: LastArrayItem[],
  fragment?: DocumentFragment,
) {
  const lastValue = {
    support, index
  }
  
  // Added to previous array
  lastArray.push(lastValue)

  const counts: Counts = {
    added: options.counts.added + index,
    removed: options.counts.removed,
  }
  
  // TODO: This might be causing double clones delete issues because all array items share same placeholder
  support.subject.global.placeholder = before // newTempElm

  const newFragment = support.buildBeforeElement(undefined, {counts})
  // if(fragment) {
  //   fragment.appendChild(newFragment)
  // } else {
    const placeholder = before // subject.global.placeholder as Text
    const parentNode = placeholder.parentNode as ParentNode
    parentNode.insertBefore(newFragment, placeholder)
  // }
}

/** compare two values. If both values are arrays then the items will be compared */
function areLikeValues(valueA: unknown, valueB: unknown): Boolean {
  if(valueA === valueB) {
    return true
  }

  const bothArrays = valueA instanceof Array && valueB instanceof Array
  const matchLengths = bothArrays && valueA.length == valueB.length
  if(matchLengths) {
    return valueA.every((item, index) => item === valueB[index])
  }

  return false
}

function setupNewTemplater(
  templater: TemplaterResult,
  ownerSupport: Support,
  itemSubject: TagSubject
) {
  const support = newSupportByTemplater(templater, ownerSupport, itemSubject)
  renderTagOnly(support, support, itemSubject, ownerSupport)
  return support
}

function destroyArrayItem(
  lastArray: LastArrayItem[],
  index: number,
  options: {
    counts: Counts
  }
) {
  const last = lastArray[index]
  const support = last.support
  destroyArrayTag(support, options.counts)
  last.deleted = true
  ++options.counts.removed
}
