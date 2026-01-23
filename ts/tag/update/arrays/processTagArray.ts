// taggedjs-no-compile

import { TemplaterResult } from '../../getTemplaterResult.function.js'
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js'
import { LastArrayItem } from '../../Context.types.js'
import { compareArrayItems } from './compareArrayItems.function.js'
import { AnySupport } from '../../index.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { TemplateValue } from '../../TemplateValue.type.js'
import { Tag } from '../../Tag.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { TagJsVar } from '../../../tagJsVars/tagJsVar.type.js'

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

      // .key() was not used
      if(item.value === null) {
        filteredLast.push(item)
        continue
      }

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

/** new and old array items processed here */
function reviewArrayItem(
  array: unknown[],
  index: number,
  lastArray: LastArrayItem[],
  ownerSupport: AnySupport,
  runtimeInsertBefore: Text | undefined, // used during updates
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = castArrayItem(array[index])
  const previousContext = lastArray[index]

  if( previousContext ) {
    return reviewPreviousArrayItem(
      item,
      previousContext,
      lastArray, ownerSupport, index,
      runtimeInsertBefore, appendTo,
    )
  }

  const contextItem = createAndProcessContextItem(
    item as TemplateValue,
    ownerSupport,
    lastArray, // acts as contexts aka Context[]
    runtimeInsertBefore as Text,
    appendTo,
  )

  // Added to previous array
  lastArray.push(contextItem)
  if(item) {
    contextItem.arrayValue = item?.arrayValue || contextItem.arrayValue || index
  }

  return contextItem
}

function reviewPreviousArrayItem(
  value: unknown,
  context: ContextItem,
  lastArray: LastArrayItem[],
  ownerSupport: AnySupport,
  index: number,
  runtimeInsertBefore: Text | undefined, // used during updates
  appendTo?: Element, // used during initial rendering of entire array
) {
  const couldBeSame = lastArray.length > index
  if (couldBeSame) {
    if(Array.isArray(value)) {
      context.tagJsVar.processUpdate(
        value, context, ownerSupport, []
      )

      context.value = value

      return context
    }

    tagValueUpdateHandler(
      value as TemplateValue,
      context,
      ownerSupport,
    )
    return context
  }

  // NEW REPLACEMENT
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

export function castArrayItem(item: any) {
  const isBasicFun = typeof item === 'function' && (item as any as TagJsVar).tagJsType === undefined
  if( isBasicFun ) {
    const fun = (item as any)
    item = fun()
  }

  return item
}