import { LastArrayItem } from '../Context.types.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { addPaintRemover } from '../../render/paint.function.js'
import { destroySupport } from '../../render/destroySupport.function.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import type { StringTag } from '../StringTag.type.js'
import { Tag } from '../Tag.type.js'
import { ContextItem } from '../ContextItem.type.js'

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

  const oldKey = prevContext.value.arrayValue
  const newValueTag = value[index]

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
  const isDiff = newValueTag && oldKey !== newValueTag.arrayValue

  if( isDiff ) {
    destroyArrayItem(prevContext)
    lastArray.splice(index, 1)
    return 2
  }

  return 0
}

export function destroyArrayItem(
  item: ContextItem,
) {
  const global = item.global as SupportTagGlobal  
  destroyArrayItemByGlobal(global, item)
}

function destroyArrayItemByGlobal(
  global: SupportTagGlobal,
  item: ContextItem,
) {
  if(global && item.state?.oldest) {
    const support = item.state.oldest
    destroySupport(support, global)
    return
  }
  
  const element = item.simpleValueElm as Element
  delete item.simpleValueElm
  addPaintRemover(element)
}