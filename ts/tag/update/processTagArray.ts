// taggedjs-no-compile

import { StringTag } from '../Tag.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { paintAppends, paintInsertBefores, paintRemoves } from '../paint.function.js'
import { processNewArrayValue } from './processNewValue.function.js'
import { destroySupport } from '../destroySupport.function.js'
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js'
import { Context, ContextItem } from '../Context.types.js'

export function processTagArray(
  subject: ContextItem,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  ownerSupport: BaseSupport | Support,
  counts: Counts,
  appendTo?: Element,
) {
  
  if(!subject.lastArray){
    subject.lastArray = [] as Context
  }
  
  let lastArray = subject.lastArray
  
  let runtimeInsertBefore = subject.placeholder

  let removed = 0
  /** 🗑️ remove previous items first */
  const filteredLast = subject.lastArray = lastArray.filter(function lastArrayFilter(
    item: ContextItem,
    index: number,
  ) {
    const newRemoved = reviewLastArrayItem(
      item, value, index, lastArray, removed, counts,
    )
    removed = removed + newRemoved
    return newRemoved === 0
  })

  // const eAppendTo = existed ? undefined : appendTo
  const eAppendTo = appendTo // existed ? undefined : appendTo

  const length = value.length
  for (let index=0; index < length; ++index) {
    const newSubject = reviewArrayItem(
      value,
      index,
      filteredLast,
      ownerSupport,
      runtimeInsertBefore,
      counts,
      eAppendTo,
    )

    runtimeInsertBefore = newSubject.placeholder
  }
}

function reviewArrayItem(
  array: unknown[],
  index: number,
  lastArray: Context,
  ownerSupport: AnySupport,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = array[index]
  const previous = lastArray[index]
  if(previous) {
    return reviewPreviousArrayItem(
      item, previous, lastArray, ownerSupport, index,
      runtimeInsertBefore, counts, appendTo,
    )
  }

  return processAddTagArrayItem(
    item,
    runtimeInsertBefore as any, // thisInsert as any,
    ownerSupport,
    counts,
    lastArray,
    appendTo,
  )
}

function reviewPreviousArrayItem(
  item: unknown,
  itemSubject: ContextItem,
  lastArray: Context,
  ownerSupport: AnySupport,
  index: number,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const couldBeSame = lastArray.length > index
  if (couldBeSame) {
    updateExistingValue(itemSubject, item as any, ownerSupport)
    return itemSubject
  }

  const result = processAddTagArrayItem(
    item,
    runtimeInsertBefore as any, // thisInsert as any,
    ownerSupport,
    counts,
    lastArray,
    appendTo,
  )

  return result
}

function processAddTagArrayItem(
  value: unknown,
  before: Text, // used during updates
  ownerSupport: AnySupport,
  counts: Counts,
  lastArray: ContextItem[],
  appendTo?: Element, // used during initial entire array rendering
): ContextItem {
  const itemSubject: ContextItem = {
    value,
    checkValueChange: checkSimpleValueChange,
  }

  counts.added = counts.added + 1 // index
  const subPlaceholder = document.createTextNode('')
  itemSubject.placeholder = subPlaceholder

  if( !appendTo ) {
    paintInsertBefores.push({
      element: subPlaceholder,
      relative: before,
    })
  }

  processNewArrayValue(value as TemplateValue, ownerSupport, itemSubject)

  processFirstSubjectValue(
    value as TemplateValue,
    itemSubject,
    ownerSupport, // support,
    counts,
    appendTo,
  )
  
  // after processing
  itemSubject.value = value

  // Added to previous array
  lastArray.push(itemSubject)

  if( appendTo ) {
    paintAppends.push({
      element: subPlaceholder,
      relative: appendTo,
    })
  }

  return itemSubject
}

export function destroyArrayItem(
  item: ContextItem,
  counts: Counts,
) {
  const global = item.global as SupportTagGlobal
  const support = global.newest
  global.deleted = true

  if(support) {
    destroySupport(support, counts.removed)
  } else {
    const element = item.simpleValueElm as Element
    delete item.simpleValueElm
    paintRemoves.push(element)
  }

  ++counts.removed
}

function reviewLastArrayItem(
  subTag: any,
  value: any[],
  index: number,
  lastArray: Context,
  removed: number,
  counts: Counts,
) {
  const newLength = value.length - 1
  const at = index - removed
  const lessLength = at < 0 || newLength < at

  if(lessLength) {
    destroyArrayItem(lastArray[index], counts)
    ++removed
    return 1
  }

  /*
  const nowValue = getArrayValueByItem(subTag)
  const lastArrayValue = lastArray.array[index].arrayValue
  */

  // check for html``.key()
  /*
  const keySet = 'arrayValue' in tag
  if (!keySet) {
    const details = {
      array: value.map(item => item.values || item),
      vdom: (tag as any)?.support.templater.tag.dom,
      tag,
      lastArray: lastArray.array[index]
    }
    const message = 'Found Tag in array without key value, during array update. Be sure to use "html`...`.key(unique)" OR import TaggedJs "key" "key(unique).html = CustomTag(props)"'
    console.error(message, details)
    const err = new ArrayNoKeyError(message, details)
    throw err
  }
  */

  /*
  const destroyItem = nowValue !== lastArrayValue
  if(destroyItem) {
    destroyArrayItem(lastArray.array, index, counts)
    ++removed
    return 1
  }
  */

  return 0
}

function getArrayValueByItem(item: any) {
  return item?.arrayValue || item
}
