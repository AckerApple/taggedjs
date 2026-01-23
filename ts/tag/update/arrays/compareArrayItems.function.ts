import { LastArrayItem } from '../../Context.types.js'
import { SupportTagGlobal, TemplaterResult } from '../../getTemplaterResult.function.js'
import { destroySupport } from '../../../render/destroySupport.function.js'
import { SupportContextItem } from '../../SupportContextItem.type.js'
import type { StringTag } from '../../StringTag.type.js'
import { Tag } from '../../Tag.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { castArrayItem } from './processTagArray.js'

/** 1 = destroyed, 2 = value changes, 0 = no change */
export function compareArrayItems(
  value: (TemplaterResult | Tag)[],
  index: number,
  lastArray: LastArrayItem[],
  removed: number,
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

  // const oldKey = prevArrayValue.arrayValue === undefined ? index : prevArrayValue.arrayValue
  const oldKey = prevContext.arrayValue // || prevContext.value.arrayValue
  const newValueTag = castArrayItem(value[index])

  const result = runArrayItemDiff(
    oldKey,
    newValueTag as StringTag,
    prevContext,
    lastArray,
    index,
  )

  return result
}

function runArrayItemDiff(
  oldKey: string,
  newValueTag: StringTag,
  prevContext: SupportContextItem,
  lastArray: LastArrayItem[],
  index: number
) {
  const newKey = newValueTag.arrayValue || index
  const isDiff = newValueTag && oldKey !== newKey

  if( isDiff ) {
    destroyArrayItem(prevContext)
    lastArray.splice(index, 1)
    return 2
  }

  return 0
}

export function destroyArrayItem(
  context: ContextItem,
) {
  const global = context.global as SupportTagGlobal  
  destroyArrayItemByGlobal(global, context)
}

function destroyArrayItemByGlobal(
  global: SupportTagGlobal,
  context: ContextItem,
) {
  if(global && context.state?.oldest) {
    const support = context.state.oldest
    destroySupport(support, global)
    return
  }
  
  context.tagJsVar.destroy(context, {} as any)
}