// taggedjs-no-compile

import { TemplaterResult } from '../getTemplaterResult.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem, LastArrayItem } from '../Context.types.js'
import { StringTag } from '../StringTag.type.js'
import { compareArrayItems } from './compareArrayItems.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'

export function processTagArray(
  subject: ContextItem,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  ownerSupport: AnySupport,
  counts: Counts,
  appendTo?: Element,
) {
  const noLast = subject.lastArray === undefined
  
  if( noLast ){
    subject.lastArray = []
  }
  
  const lastArray = subject.lastArray as LastArrayItem[]
  
  let runtimeInsertBefore = subject.placeholder
  let removed = 0

  /** 🗑️ remove previous items first */
  const filteredLast: LastArrayItem[] = []

  // if not first time, then check for deletes
  if(!noLast) {
    // on each loop check the new length
    for (let index=0; index < lastArray.length; ++index) {
      const item = lastArray[index]

      // 👁️ COMPARE & REMOVE
      const newRemoved = compareArrayItems(
        value, index, lastArray, removed, counts,
      )
  
      if(newRemoved === 0) {
        filteredLast.push(item)
        continue
      }

      // do the same number again because it was a mid delete
      if(newRemoved === 2) {
        index = index - 1
        continue
      }

      removed = removed + newRemoved
    }
    
    subject.lastArray = filteredLast
  }

  const length = value.length
  for (let index=0; index < length; ++index) {
    const newSubject = reviewArrayItem(
      value,
      index,
      subject.lastArray as LastArrayItem[],
      ownerSupport,
      runtimeInsertBefore,
      counts,
      appendTo,
    )

    runtimeInsertBefore = newSubject.placeholder
  }
}

function reviewArrayItem(
  array: unknown[],
  index: number,
  lastArray: LastArrayItem[],
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

  const contextItem = createAndProcessContextItem(
    item as TemplateValue,
    ownerSupport,
    counts,
    runtimeInsertBefore as Text,
    appendTo,
  )

  // Added to previous array
  lastArray.push(contextItem)

  return contextItem
}

function reviewPreviousArrayItem(
  value: unknown,
  itemSubject: ContextItem,
  lastArray: LastArrayItem[],
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

  const contextItem = createAndProcessContextItem(
    value as TemplateValue,
    ownerSupport,
    counts,
    runtimeInsertBefore as Text,
    appendTo,
  )

  // Added to previous array
  lastArray.push(contextItem)

  return contextItem
}
