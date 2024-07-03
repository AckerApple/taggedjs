// taggedjs-no-compile

import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { DomTag, StringTag, TagTemplate } from '../Tag.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ArrayNoKeyError } from '../../errors.js'
import { destroyArrayTag } from '../checkDestroyPrevious.function.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { isTagClass } from '../../isInstance.js'
import { TagSubject } from '../../subject.types.js'
import { TagJsSubject } from './TagJsSubject.class.js'
import { textNode } from '../textNode.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { afterChildrenBuilt } from './afterChildrenBuilt.function.js'

export type LastArrayItem = {
  support: Support
  index: number
  deleted?: boolean
}

type LastArrayMeta = {
  array: LastArrayItem[]
  lastRuns?: {[index: number]: TagTemplate}
}

export type TagArraySubject = TagJsSubject<StringTag[]> & {
  insertBefore: InsertBefore // template tag
  lastArray?: LastArrayMeta // previous array that may have been processed
}

export function processTagArray(
  subject: TagArraySubject,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  insertBefore: InsertBefore, // <template end interpolate />
  ownerSupport: BaseSupport | Support,
  options: {
    counts: Counts
  },
  fragment?: DocumentFragment,
// ): DomObjectChildren {
): DocumentFragment | undefined {
  const global = subject.global
  ++global.renderCount
  
  const existed = subject.lastArray ? true : false
  const lastArray = subject.lastArray = subject.lastArray || {array: []}
  let lastFragment: DocumentFragment | undefined
  const runtimeInsertBefore = global.placeholder

  let removed = 0
  /** 🗑️ remove previous items first */
  lastArray.array = lastArray.array.filter((
    item: LastArrayItem,
    index: number,
  ) => {
    const {newRemoved, same} = reviewLastArrayItem(
      item, value, index, lastArray, removed, options
    )
    removed = removed + newRemoved
    return same
  })

  const length = value.length
  for (let index=0; index < length; ++index) {
    lastFragment = reviewArrayItem(
      value,
      index,
      lastArray,
      ownerSupport,
      existed,
      runtimeInsertBefore,
      options,
      fragment,
    )
  }

  return lastFragment || fragment
}

function reviewArrayItem(
  value: unknown[],
  index: number,
  lastArray: LastArrayMeta,
  ownerSupport: AnySupport,
  existed: boolean,
  runtimeInsertBefore: Text | undefined,
  options: {
    counts: Counts
  },
  fragment?: DocumentFragment,
) {
  const item = value[index]
  const previous = lastArray.array[index]
  const previousSupport = previous?.support
  const subTag = item as StringTag | DomTag | TemplaterResult
  // const tagClass = isTagClass(subTag)
  const itemSubject = previousSupport?.subject || new TagJsSubject(
    // undefined
    item,
  ) as unknown as TagSubject

  const templater = (subTag as StringTag | DomTag).templater

  // check for html``.key()
  const tag = templater?.tag || subTag as StringTag | DomTag
  const keySet = 'arrayValue' in tag
  if (existed && lastArray.array.length != value.length && !keySet) {
    const details = {
      // template: support.getTemplate().string,
      array: value,
    }
    const message = 'Found Tag in array without key value, during array update. Be sure to use "html`...`.key(unique)" OR import TaggedJs "key" "key(unique).html = CustomTag(props)"'
    console.error(message, details)
    const err = new ArrayNoKeyError(message, details)
    throw err
  }

  const couldBeSame = lastArray.array.length > index
  if (couldBeSame) {
    updateExistingValue(
      itemSubject,
      item as TemplateValue,
      ownerSupport, // prevSupport,
      // ??? recently switched
      // prevGlobal.insertBefore as InsertBefore,
      runtimeInsertBefore as InsertBefore,
    )

    return
  }

  const {newFragment, newSupport} = processAddTagArrayItem(
    item,
    runtimeInsertBefore as any, // thisInsert as any,
    itemSubject,
    index,
    ownerSupport,
    options,
    lastArray.array,
    fragment,
  )

  if(newSupport) {
    ownerSupport.subject.global.childTags.push(newSupport as Support)
  }
  
  return newFragment
}

function setPlaceholderElm(
  subject: TagSubject, // || TagArraySubject,
) {
  const elm = textNode.cloneNode(false) as Text
  return subject.global.placeholder = elm
}

function processAddTagArrayItem(
  item: unknown,
  before: Text,
  itemSubject: TagSubject,
  index: number,
  ownerSupport: AnySupport,
  options: {
    counts: Counts
  },
  lastArray: LastArrayItem[],
  fragment?: DocumentFragment,
): {newFragment?: DocumentFragment, newSupport?: AnySupport} {
  options.counts.added = options.counts.added + 1 // index
  // options.counts.removed
  
  const insertBefore = document.createTextNode('')
  const subPlaceholder = setPlaceholderElm( itemSubject )
  const parentNode = before.parentNode as ParentNode

  if(fragment) {
    fragment.insertBefore(insertBefore, before)
    fragment.insertBefore(subPlaceholder, before)
  } else {
    parentNode.insertBefore(insertBefore, before)
    parentNode.insertBefore(subPlaceholder, before)
  }

  const { fragment: newFragment, support } = processFirstSubjectValue(
    item as TemplateValue,
    itemSubject,
    insertBefore, // subPlaceholder,
    ownerSupport, // support,
    options,
  )

  const children = itemSubject.global.htmlDomMeta
  
  if(newFragment) {
    if(fragment) {
      fragment.insertBefore(newFragment, subPlaceholder)
    } else {
      parentNode.insertBefore(newFragment, subPlaceholder)
    }
  }
  
  children.forEach(child => {
    const element = child.domElement

    if (element && child.nodeName !== 'text') {
      afterChildrenBuilt([element] as any, itemSubject, support as Support)
    }
  })

  const lastValue = {
    support: support as Support, index
  }
  
  // Added to previous array
  lastArray.push(lastValue)

  return {newFragment, newSupport: support}
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

function reviewLastArrayItem(
  item: any,
  value: any[],
  index: number,
  lastArray: LastArrayMeta,
  removed: number,
  options: {
    counts: Counts
  },
) {
  const newLength = value.length-1
  const at = index - removed
  const lessLength = at < 0 || newLength < at

  if(lessLength) {
    destroyArrayItem(lastArray.array, index, options)
    ++removed
    return {same: false, newRemoved: removed}
  }

  const subTag = value[index - removed] as StringTag | DomTag | TemplaterResult | undefined
  const tagClass = isTagClass(subTag)

  const tag = subTag as StringTag | DomTag
  let templater = tag.templater // || subTag
  let prevArrayValue: unknown

  if(tagClass) {
    prevArrayValue = (tag as any).arrayValue
  } else {
    templater = subTag as TemplaterResult
    // tag = templater.tag as StringTag | DomTag
    prevArrayValue = (templater as any).arrayValue
  }

  // const tag = subTag?.templater.tag as Tag
  const lateTemp = item.support.templater
  const lastTag = lateTemp?.tag || lateTemp
  const lastArrayValue = (lastTag as any).arrayValue
  const destroyItem = !areLikeValues(prevArrayValue, lastArrayValue)
  
  if(destroyItem) {
    destroyArrayItem(lastArray.array, index, options)
    ++removed
    return {same:false, newRemoved: removed}
  }

  return {same:true, newRemoved: removed}
}
