// taggedjs-no-compile

import { TemplaterResult } from '../getTemplaterResult.function.js'
import { tagValueUpdateHandler } from './tagValueUpdateHandler.function.js'
import { LastArrayItem } from '../Context.types.js'
import { compareArrayItems } from './compareArrayItems.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { Tag } from '../Tag.type.js'
import { ContextItem } from '../ContextItem.type.js'

export function processTagArray(
  contextItem: ContextItem,
  value: (TemplaterResult | Tag)[], // arry of Tag classes
  ownerSupport: AnySupport,
  appendTo?: Element,
) {
  const noLast = contextItem.lastArray === undefined

  
  if( noLast ){
    contextItem.lastArray = []
  }
  
  const lastArray = contextItem.lastArray as LastArrayItem[]
  
  let runtimeInsertBefore = contextItem.placeholder
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
        value, index, lastArray, removed,
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
    
    contextItem.lastArray = filteredLast
  }

  const length = value.length
  for (let index=0; index < length; ++index) {
    const newSubject = reviewArrayItem(
      value,
      index,
      contextItem.lastArray as LastArrayItem[],
      ownerSupport,
      runtimeInsertBefore,
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
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = array[index]
  const previous = lastArray[index]

  if(previous) {
    return reviewPreviousArrayItem(
      item, previous, lastArray, ownerSupport, index,
      runtimeInsertBefore, appendTo,
    )
  }

  const contextItem = createAndProcessContextItem(
    item as TemplateValue,
    ownerSupport,
    lastArray,
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
  appendTo?: Element, // used during initial rendering of entire array
) {
  const couldBeSame = lastArray.length > index
  if (couldBeSame) {
    tagValueUpdateHandler(
      value as TemplateValue,
      itemSubject,
      ownerSupport,
    )
    return itemSubject
  }

  const contextItem = createAndProcessContextItem(
    value as TemplateValue,
    ownerSupport,
    lastArray,
    runtimeInsertBefore as Text,
    appendTo,
  )

  // Added to previous array
  lastArray.push(contextItem)

  return contextItem
}
