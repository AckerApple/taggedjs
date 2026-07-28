// taggedjs-no-compile

import { TemplaterResult } from '../../getTemplaterResult.function.js'
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js'
import { LastArrayItem } from '../../Context.types.js'
import { destroyArrayItem } from './compareArrayItems.function.js'
import { AnySupport, TagJsComponent } from '../../index.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { TemplateValue } from '../../TemplateValue.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { TagJsTag } from '../../../TagJsTags/TagJsTag.type.js'
import { enqueueBatchAfterUnique } from '../../../render/paint.function.js'

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

  const batchUpdates = !noPriorRun && (
    length !== lastArray.length ||
    lastArray.some(item => item.locked === 1)
  )
  const liveArray = noPriorRun
    ? lastArray
    : reconcileArrayContexts(lastArray, length, getCastedArrayItem)

  context.lastArray = liveArray
  for (let index=0; index < length; ++index) {
    const insertBefore = findNextArrayStartMarker(
      liveArray,
      index + 1,
    ) || context.placeholder
    reviewArrayItem(
      index,
      liveArray,
      ownerSupport,
      batchUpdates,
      getCastedArrayItem,
      insertBefore,
      appendTo,
    )
  }
}

function findNextArrayStartMarker(
  contexts: LastArrayItem[],
  fromIndex: number,
) {
  for (let index = fromIndex; index < contexts.length; ++index) {
    const marker = contexts[index]?.arrayStartMarker
    if(marker) {
      return marker
    }
  }
}

function reconcileArrayContexts(
  lastArray: LastArrayItem[],
  newLength: number,
  getCastedArrayItem: (index: number) => unknown,
) {
  const nextArray = new Array<LastArrayItem>(newLength)
  const usedContexts = new Set<LastArrayItem>()
  const keyedContexts = new Map<unknown, LastArrayItem[]>()

  for (let index = 0; index < lastArray.length; ++index) {
    const context = lastArray[index]
    const key = getContextKey(context)
    if(key === undefined) {
      continue
    }

    const matches = keyedContexts.get(key)
    if(matches) {
      matches.push(context)
    } else {
      keyedContexts.set(key, [context])
    }
  }

  // Explicit keys retain identity even when nullable siblings shift indices.
  for (let index = 0; index < newLength; ++index) {
    const key = getValueKey(getCastedArrayItem(index))
    if(key === undefined) {
      continue
    }

    const matches = keyedContexts.get(key)
    const context = matches?.shift()
    if(context) {
      nextArray[index] = context
      usedContexts.add(context)
    }
  }

  // Values without keys continue to use their array position as identity.
  for (let index = 0; index < newLength; ++index) {
    if(nextArray[index]) {
      continue
    }

    const context = lastArray[index]
    const value = getCastedArrayItem(index)
    const contextKey = getContextKey(context)
    const valueKey = getValueKey(value)
    if(
      context &&
      !usedContexts.has(context) &&
      (
        (contextKey === undefined && valueKey === undefined) ||
        isEmptyValue(context.value) ||
        isEmptyValue(value)
      )
    ) {
      nextArray[index] = context
      usedContexts.add(context)
    }
  }

  for (let index = 0; index < lastArray.length; ++index) {
    const context = lastArray[index]
    if(!usedContexts.has(context)) {
      destroyArrayItem(context)
    }
  }

  return nextArray
}

function getContextKey(
  context: ContextItem | undefined,
) {
  return context?.arrayValue
}

function getValueKey(
  value: unknown,
) {
  return (value as any)?.arrayValue
}

function isEmptyValue(
  value: unknown,
) {
  return value === null || value === undefined
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
    const key = getValueKey(item)
    if(key === undefined) {
      delete previousContext.arrayValue
    } else {
      previousContext.arrayValue = key
    }

    return reviewPreviousArrayItem(
      item,
      previousContext,
      ownerSupport,
      batchUpdates && previousContext.locked !== 1,
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

  lastArray[index] = context
  const key = getValueKey(item)
  if(key !== undefined) {
    context.arrayValue = key
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

  tagValueUpdateHandler(
    value as TemplateValue,
    context,
    ownerSupport,
  )

  return context
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
