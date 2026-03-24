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
import { enqueueBatchAfterUnique } from '../../../render/paint.function.js'
import { SupportContextItem } from '../../SupportContextItem.type.js'

const notCasted = Symbol('not-casted')
const noArgs: any[] = []

export function processTagArray(
  context: ContextItem,
  value: (TemplaterResult | TagJsComponent<any>)[], // arry of Tag classes
  ownerSupport: AnySupport,
  appendTo?: Element,
) {
  const noPriorRun = context.lastArray === undefined

  if( noPriorRun ){
    context.lastArray = []
  }
  
  const lastArray = context.lastArray as LastArrayItem[]
  
  let runtimeInsertBefore = context.placeholder
  const length = value.length
  const castedCache: unknown[] = new Array(length).fill(notCasted)
  const getCastedArrayItem = function getCastedArrayItem(index: number) {
    const cached = castedCache[index]
    if(cached !== notCasted) {
      return cached
    }

    const casted = castArrayItem(value[index])
    castedCache[index] = casted
    return casted
  }

  let batchUpdates = noPriorRun ? false : length !== lastArray.length

  // ARRAY DELETES
  if( !noPriorRun ) {
    // on each loop check the new length
    const results = runArrayDeleteCheck(
      lastArray,
      value,
      context,
      batchUpdates,
      getCastedArrayItem,
    )

    batchUpdates = results.batchUpdates
  }

  const liveArray = context.lastArray as LastArrayItem[]
  for (let index=0; index < length; ++index) {
    const newSubject = reviewArrayItem(
      index,
      liveArray,
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
  const maxIndex = value.length - 1

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
      index, lastArray, removed, maxIndex, getCastedArrayItem
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
  
  return {batchUpdates}
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
      ownerSupport,
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
  ownerSupport: AnySupport,
  batchUpdates: boolean, // delay render
  _runtimeInsertBefore: Text | undefined, // used during updates
  _appendTo?: Element, // used during initial rendering of entire array
) {
  if( batchUpdates ) {
    enqueueBatchAfterUnique(context, [runArrayBatchAfterHandler, [value, context, ownerSupport]])
    context.value = value

    return context
  }

  // array item returned array
  if(Array.isArray(value)) {
    context.tagJsVar.processUpdate(
      value, context, ownerSupport, noArgs
    )
    context.value = value

    return context
  }

  const tagValueUpdateResult = tagValueUpdateHandler(
    value as TemplateValue,
    context,
    ownerSupport,
  )

  return context
}

/** Run within first array processing loop
 *  1 = destroyed, 2 = value changes, 0 = no change */
function compareArrayItems(
  index: number,
  lastArray: LastArrayItem[],
  removed: number,
  maxIndex: number,
  getCastedArrayItem: (index: number) => unknown,
) {
  const at = index - removed
  const lessLength = at < 0 || maxIndex < at
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

function runArrayBatchAfterHandler(
  value: unknown,
  context: ContextItem,
  ownerSupport: AnySupport,
) {
  tagValueUpdateHandler(
    value as TemplateValue,
    context,
    ownerSupport,
  )
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
