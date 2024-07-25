// taggedjs-no-compile

import { Context, ContextItem, StringTag, TagTemplate } from '../Tag.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { paintAppends, paintInsertBefores, paintRemoves } from '../paint.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { processNewArrayValue } from './processNewValue.function.js'
import { destroySupport } from '../destroySupport.function.js'

export function processTagArray(
  subject: ContextItem,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  ownerSupport: BaseSupport | Support,
  counts: Counts,
  appendTo?: Element,
) {
  const global = subject.global
  const existed = global.context ? true : false
  if(!existed){
    global.context = [] as Context
  }

  
  let runtimeInsertBefore = global.placeholder
  const lastArray = global.context as Context

  let removed = 0
  /** 🗑️ remove previous items first */
  const filteredLast = global.context = lastArray.filter(function lastArrayFilter(
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

    runtimeInsertBefore = newSubject.global.placeholder
  }
}

function reviewArrayItem(
  value: unknown[],
  index: number,
  lastArray: Context,
  ownerSupport: AnySupport,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = value[index]
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
    index,
    ownerSupport,
    counts,
    lastArray,
    appendTo,
  )
}

function reviewPreviousArrayItem(
  item: unknown,
  previous: ContextItem,
  lastArray: Context,
  ownerSupport: AnySupport,
  index: number,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const itemSubject: ContextItem = previous

  const couldBeSame = lastArray.length > index
  if (couldBeSame) {
    updateExistingValue(itemSubject, item as any, ownerSupport)
    return itemSubject
  }

  return processAddTagArrayItem(
    item,
    runtimeInsertBefore as any, // thisInsert as any,
    index,
    ownerSupport,
    counts,
    lastArray,
    appendTo,
  )
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
  // itemSubject: ContextItem,
  index: number,
  ownerSupport: AnySupport,
  counts: Counts,
  lastArray: ContextItem[],
  appendTo?: Element, // used during initial entire array rendering
): ContextItem {
  const itemSubject: ContextItem = {
    value: item,
    global: getNewGlobal(),
  }

  counts.added = counts.added + 1 // index
  const subPlaceholder = setPlaceholderElm( itemSubject )

  if( !appendTo ) {
    paintInsertBefores.push({
      element: subPlaceholder,
      relative: before,
    })
  }

  processNewArrayValue(item as TemplateValue, ownerSupport, itemSubject)

  processFirstSubjectValue(
    item as TemplateValue,
    itemSubject,
    ownerSupport, // support,
    counts,
    appendTo,
  )
  
  // after processing
  itemSubject.value = item
  itemSubject.global.lastValue = item  

  // Added to previous array
  lastArray.push(itemSubject)

  if( appendTo ) {
    paintAppends.push({
      element: subPlaceholder,
      relative: appendTo,
    })
  }

  /*
  const newSupport = itemSubject.global.newest
  if(newSupport) {
    ownerSupport.subject.global.childTags.push(newSupport as Support)
  }
  */

  return itemSubject
}

export function destroyArrayItem(
  item: ContextItem,
  counts: Counts,
) {
  const global = item.global
  const support = global.newest as Support

  if(support) {
    destroySupport(support, counts.removed++)
  } else {
    const element = global.simpleValueElm as Element
    paintRemoves.push(element)
  }

  // last.deleted = true
  global.deleted = true
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
