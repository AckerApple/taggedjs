// taggedjs-no-compile

import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { TemplaterResult } from '../getTemplaterResult.function.js'
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { AnySupport } from '../getSupport.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { processNewArrayValue } from './processNewValue.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Context.types.js'
import { StringTag } from '../getDomTag.function.js'
import { compareArrayItems } from './compareArrayItems.function.js'

export function processTagArray(
  subject: ContextItem,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  ownerSupport: AnySupport,
  counts: Counts,
  appendTo?: Element,
) {
  
  if(!subject.lastArray){
    subject.lastArray = [] as ContextItem[]
  }
  
  const lastArray = subject.lastArray
  
  let runtimeInsertBefore = subject.placeholder

  let removed = 0
  /** 🗑️ remove previous items first */
  const filteredLast: ContextItem[] = []
  
  for (let index=0; index < lastArray.length; ++index) {
    const item: ContextItem = lastArray[index]
    
    // 👁️ COMPARE & REMOVE
    const newRemoved = compareArrayItems(
      item, value, index, lastArray, removed, counts,
    )

    if(newRemoved === 0) {
      filteredLast.push(item)
      continue
    }
    
    removed = removed + newRemoved

    // do the same number again because it was a mid delete
    if(newRemoved === 2) {
      index = index - 1
    }
  }

  subject.lastArray = filteredLast

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
  lastArray: ContextItem[],
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
    runtimeInsertBefore as Text, // thisInsert as any,
    ownerSupport,
    counts,
    lastArray,
    appendTo,
  )
}

function reviewPreviousArrayItem(
  value: unknown,
  itemSubject: ContextItem,
  lastArray: ContextItem[],
  ownerSupport: AnySupport,
  index: number,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const couldBeSame = lastArray.length > index
  if (couldBeSame) {
    updateExistingValue(itemSubject, value as TemplateValue, ownerSupport)
    return itemSubject
  }

  const result = processAddTagArrayItem(
    value,
    runtimeInsertBefore as Text, // thisInsert as any,
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
    withinOwnerElement: false, // TODO: we need to pass down depth so we can answer this truthfully
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
    ownerSupport,
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
