// taggedjs-no-compile

import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { ContextItem, DomTag, StringTag, TagTemplate } from '../Tag.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ArrayNoKeyError } from '../../errors.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { textNode } from '../textNode.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { paintAppends, paintInsertBefores, paintRemoves } from '../paint.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { processNewArrayValue } from './processNewValue.function.js'

export type LastArrayItem = {
  support: Support
  index: number
  deleted?: boolean
}

type LastArrayMeta = {
  array: LastArrayItem[]
  lastRuns?: {[index: number]: TagTemplate}
}

export type TagArraySubject = ContextItem & {
  insertBefore: InsertBefore // template tag
  lastArray?: LastArrayMeta // previous array that may have been processed
}

export function processTagArray(
  subject: TagArraySubject,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  ownerSupport: BaseSupport | Support,
  counts: Counts,
  appendTo?: Element,
) {
  const global = subject.global
  ++global.renderCount
  
  const existed = subject.lastArray ? true : false
  const lastArray = subject.lastArray = subject.lastArray || {array: []}
  const runtimeInsertBefore = global.placeholder

  let removed = 0
  /** 🗑️ remove previous items first */
  lastArray.array = lastArray.array.filter((
    item: LastArrayItem,
    index: number,
  ) => {
    const {newRemoved, same} = reviewLastArrayItem(
      item, value, index, lastArray, removed, counts
    )
    removed = removed + newRemoved
    return same
  })

  const length = value.length
  for (let index=0; index < length; ++index) {
    reviewArrayItem(
      value,
      index,
      lastArray,
      ownerSupport,
      existed,
      runtimeInsertBefore,
      counts,
      existed ? undefined : appendTo,
    )
  }
}

function reviewArrayItem(
  value: unknown[],
  index: number,
  lastArray: LastArrayMeta,
  ownerSupport: AnySupport,
  existed: boolean,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = value[index]
  const previous = lastArray.array[index]
  const previousSupport = previous?.support
  const subTag = item as StringTag | DomTag | TemplaterResult
  const itemSubject: ContextItem = previousSupport?.subject || {
    // tagJsType: item,
    value,
    global: getNewGlobal(),
  }

  const templater = (subTag as StringTag | DomTag).templater

  // check for html``.key()
  const tag = templater?.tag || subTag as StringTag | DomTag
  const keySet = 'arrayValue' in tag
  if (existed && lastArray.array.length != value.length && !keySet) {
    const details = {
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
      ownerSupport,
    )

    return
  }

  const newSupport = processAddTagArrayItem(
    item,
    runtimeInsertBefore as any, // thisInsert as any,
    itemSubject,
    index,
    ownerSupport,
    counts,
    lastArray.array,
    appendTo,
  )

  if(newSupport) {
    ownerSupport.subject.global.childTags.push(newSupport as Support)
  }
  
  return
}

function setPlaceholderElm(
  subject: ContextItem,
) {
  // const elm = textNode.cloneNode(false) as Text
  const elm = document.createTextNode('')
  return subject.global.placeholder = elm
}

function processAddTagArrayItem(
  item: unknown,
  before: Text, // used during updates
  itemSubject: ContextItem,
  index: number,
  ownerSupport: AnySupport,
  counts: Counts,
  lastArray: LastArrayItem[],
  appendTo?: Element, // used during initial entire array rendering
): AnySupport {
  counts.added = counts.added + 1 // index
  const subPlaceholder = setPlaceholderElm( itemSubject )

  if( appendTo ) {
    paintAppends.push({
      element: subPlaceholder,
      relative: appendTo,
    })
  } else {
    paintInsertBefores.push({
      element: subPlaceholder,
      relative: before,
    })
  }

  processNewArrayValue(item as TemplateValue, ownerSupport, itemSubject)

  const support = processFirstSubjectValue(
    item as TemplateValue,
    itemSubject,
    ownerSupport, // support,
    counts,
    appendTo,
  ) as Support
  
  // Added to previous array
  lastArray.push({
    support, index
  })

  return support
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

export function destroyArrayItem(
  lastArray: LastArrayItem[],
  index: number,
  counts: Counts,
) {
  const last = lastArray[index]
  const support = last.support
  destroyArrayTag(support, counts)
  last.deleted = true
  ++counts.removed
}

/** Destroys one item in an array of items */
function destroyArrayTag(
  support: Support,
  counts: Counts,
) {
  Promise.resolve().then(() => {
    const global = support.subject.global
    const ph = global.placeholder as Text
    delete global.placeholder
    paintRemoves.push(ph)
  })

  support.destroy({
    stagger: counts.removed++,
  })
}

function reviewLastArrayItem(
  item: any,
  value: any[],
  index: number,
  lastArray: LastArrayMeta,
  removed: number,
  counts: Counts,
) {
  const newLength = value.length - 1
  const at = index - removed
  const lessLength = at < 0 || newLength < at

  if(lessLength) {
    destroyArrayItem(lastArray.array, index, counts)
    ++removed
    return {same: false, newRemoved: removed}
  }

  const subTag = value[index - removed] as StringTag | DomTag | TemplaterResult | undefined

  const tag = subTag as StringTag | DomTag
  let templater = tag.templater // || subTag
  let prevArrayValue: unknown

  templater = subTag as TemplaterResult
  // tag = templater.tag as StringTag | DomTag
  prevArrayValue = (templater as any).arrayValue

  // const tag = subTag?.templater.tag as Tag
  const lateTemp = item.support.templater
  const lastTag = lateTemp?.tag || lateTemp
  const lastArrayValue = (lastTag as any).arrayValue
  const destroyItem = !areLikeValues(prevArrayValue, lastArrayValue)
  if(destroyItem) {
    destroyArrayItem(lastArray.array, index, counts)
    ++removed
    return {same:false, newRemoved: removed}
  }

  return {same:true, newRemoved: removed}
}
