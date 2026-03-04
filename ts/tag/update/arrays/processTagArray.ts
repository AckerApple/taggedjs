// taggedjs-no-compile

import { TemplaterResult } from '../../getTemplaterResult.function.js'
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js'
import { LastArrayItem } from '../../Context.types.js'
import { compareArrayItems } from './compareArrayItems.function.js'
import { AnySupport, TagJsComponent } from '../../index.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { TemplateValue } from '../../TemplateValue.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { TagJsTag } from '../../../TagJsTags/TagJsTag.type.js'
import { batchAfters } from '../../../render/paint.function.js'

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
  let batchUpdates = noPriorRun ? false : length !== lastArray.length

  // ARRAY DELETES
  if( !noPriorRun ) {
    // on each loop check the new length
    const results = runArrayDeleteCheck(
      lastArray,
      value,
      contextItem,
      batchUpdates,
    )

    batchUpdates = results.batchUpdates
  }

  for (let index=0; index < length; ++index) {
    const newSubject = reviewArrayItem(
      value,
      index,
      contextItem.lastArray as LastArrayItem[],
      ownerSupport,
      batchUpdates,
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
) {
  /** 🗑️ remove previous items first */
  const filteredLast: LastArrayItem[] = []
  let removed = 0

  for (let index = 0; index < lastArray.length; ++index) {
    const item = lastArray[index]

    if( item.locked === 1 ) {
      batchUpdates = true // The item we are looking to update caused the render we are under
    }

    // .key() was not used
    if (item.value === null) {
      filteredLast.push(item)
      continue
    }

    // 👁️ COMPARE & REMOVE
    const newRemoved = compareArrayItems(
      value, index, lastArray, removed
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
  array: unknown[],
  index: number,
  lastArray: LastArrayItem[],
  ownerSupport: AnySupport,
  batchUpdates: boolean,
  runtimeInsertBefore: Text | undefined, // used during updates
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = castArrayItem(array[index])
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
  batchUpdates: boolean, // delay render
  runtimeInsertBefore: Text | undefined, // used during updates
  appendTo?: Element, // used during initial rendering of entire array
) {
  if( batchUpdates ) {
    batchAfters.push([() => {
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

export function castArrayItem(item: any) {
  const isBasicFun = typeof item === 'function' && (item as any as TagJsTag<any>).tagJsType === undefined
  if( isBasicFun ) {
    const fun = (item as any)
    item = fun()
  }

  return item
}