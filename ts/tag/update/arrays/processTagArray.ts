// taggedjs-no-compile

import { TemplaterResult } from '../../getTemplaterResult.function.js'
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js'
import { LastArrayItem } from '../../Context.types.js'
import { destroyArrayItem, runArrayItemDiff } from './compareArrayItems.function.js'
import { AnySupport, StringTag, TagJsComponent } from '../../index.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { TemplateValue } from '../../TemplateValue.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { TagJsTag } from '../../../TagJsTags/TagJsTag.type.js'
import { batchAfters } from '../../../render/paint.function.js'
import { SupportContextItem } from '../../SupportContextItem.type.js'

export function processTagArray(
  contextItem: ContextItem,
  value: (TemplaterResult | TagJsComponent<any>)[], // arry of Tag classes
  ownerSupport: AnySupport,
  appendTo?: Element,
) {
  const noPriorRun = contextItem.lastArray === undefined

  if( noPriorRun ){
    contextItem.lastArray = []
  }
  
  const lastArray = contextItem.lastArray as LastArrayItem[]
  
  let runtimeInsertBefore = contextItem.placeholder
  const length = value.length
  const castedCache: unknown[] = new Array(length)
  const castedCacheSet: boolean[] = new Array(length)
  const getCastedArrayItem = function getCastedArrayItem(index: number) {
    if(castedCacheSet[index]) {
      return castedCache[index]
    }

    const casted = castArrayItem(value[index])
    castedCache[index] = casted
    castedCacheSet[index] = true
    return casted
  }

  let batchUpdates = noPriorRun ? false : length !== lastArray.length

  // ARRAY DELETES
  if( !noPriorRun ) {
    // on each loop check the new length
    const results = runArrayDeleteCheck(
      lastArray,
      value,
      contextItem,
      batchUpdates,
      getCastedArrayItem,
    )

    batchUpdates = results.batchUpdates
  }

  for (let index=0; index < length; ++index) {
    const newSubject = reviewArrayItem(
      index,
      contextItem.lastArray as LastArrayItem[],
      ownerSupport,
      batchUpdates,
      getCastedArrayItem,
      runtimeInsertBefore,
      appendTo,
    )

    runtimeInsertBefore = newSubject.placeholder
  }
}

function runArrayDeleteCheck(
  lastArray: ContextItem[],
  value: (TemplaterResult | TagJsComponent<any>)[],
  contextItem: ContextItem,
  batchUpdates: boolean,
  getCastedArrayItem: (index: number) => unknown,
) {
  /** 🗑️ remove previous items first */
  const filteredLast: LastArrayItem[] = []
  let removed = 0

  for (let index = 0; index < lastArray.length; ++index) {
    const item = lastArray[index]

    if( item.locked === 1 ) {
      batchUpdates = true // The item we are looking to update caused the render we are under
    }

    if (item.value === null) {
      filteredLast.push(item)
      continue
    }

    // 👁️ COMPARE & REMOVE
    const newRemoved = compareArrayItems(
      value, index, lastArray, removed, getCastedArrayItem
    )

    if (newRemoved === 0) {
      filteredLast.push(item)
      continue
    }

    // do the same number again because it was a mid delete
    if (newRemoved === 2) {
      index = index - 1
      continue
    }

    removed = removed + newRemoved
  }

  contextItem.lastArray = filteredLast
  
  return {removed, batchUpdates}
}

/** new and old array items processed here */
function reviewArrayItem(
  index: number,
  lastArray: LastArrayItem[],
  ownerSupport: AnySupport,
  batchUpdates: boolean,
  getCastedArrayItem: (index: number) => unknown,
  runtimeInsertBefore: Text | undefined, // used during updates
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = getCastedArrayItem(index)
  const previousContext = lastArray[index]

  if( previousContext ) {
    return reviewPreviousArrayItem(
      item,
      previousContext,
      lastArray,
      ownerSupport,
      index,
      batchUpdates,
      runtimeInsertBefore,
      appendTo,
    )
  }

  // 🆕 NEW Array items processed below

  const context = createAndProcessContextItem(
    item as TemplateValue,
    ownerSupport,
    lastArray, // acts as contexts aka Context[]
    runtimeInsertBefore as Text,
    appendTo,
  )

  // Added to previous array
  lastArray.push(context)
  if(item) {
    // set or use key()
    // context.arrayValue = item?.arrayValue || context.arrayValue || context.value
    context.arrayValue = (item as any).arrayValue || context.arrayValue
  }

  return context
}

function reviewPreviousArrayItem(
  value: unknown,
  context: ContextItem,
  lastArray: LastArrayItem[],
  ownerSupport: AnySupport,
  index: number,
  batchUpdates: boolean, // delay render
  runtimeInsertBefore: Text | undefined, // used during updates
  appendTo?: Element, // used during initial rendering of entire array
) {
  if( batchUpdates ) {
    batchAfters.push([function arrayBatchAfterHandler() {
      tagValueUpdateHandler(
        value as TemplateValue,
        context,
        ownerSupport,
      )
    }, []])
    context.value = value

    return context
  }

  const couldBeSame = lastArray.length > index
  if (couldBeSame) {
    // array item returned array
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

/** Run within first array processing loop
 *  1 = destroyed, 2 = value changes, 0 = no change */
function compareArrayItems(
  value: (TemplaterResult | TagJsComponent<any>)[],
  index: number,
  lastArray: LastArrayItem[],
  removed: number,
  getCastedArrayItem: (index: number) => unknown,
) {
  const newLength = value.length - 1
  const at = index - removed
  const lessLength = at < 0 || newLength < at
  const prevContext = lastArray[index] as SupportContextItem

  if(lessLength) {
    destroyArrayItem(prevContext)
    return 1
  }

  if( prevContext.arrayValue === undefined ) {
    prevContext.arrayValue = index
  }

  const oldKey = prevContext.arrayValue
  const newValueTag = getCastedArrayItem(index)

  const result = runArrayItemDiff(
    oldKey,
    newValueTag as StringTag,
    prevContext,
    lastArray,
    index,
  )

  return result
}

// For when an item in the array is a function
export function castArrayItem(item: any) {
  if(typeof item !== 'function') {
    return item
  }

  const callable = item as (() => unknown) & TagJsTag<any>
  if(callable.tagJsType !== undefined) {
    return item
  }

  return callable()
}
