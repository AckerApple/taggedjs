import type { TagCounts } from '../../tag/TagCounts.type.js'
import { LastArrayItem } from '../Context.types.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { paintCommands, paintRemover } from '../../render/paint.function.js'
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
  counts: TagCounts,
) {
  const newLength = value.length - 1
  const at = index - removed
  const lessLength = at < 0 || newLength < at
  const prevContext = lastArray[index] as SupportContextItem

  if(lessLength) {
    destroyArrayItem(prevContext, counts)
    return 1
  }

  const oldKey = prevContext.value.arrayValue
  const newValueTag = value[index]

  const result = runArrayItemDiff(
    oldKey,
    newValueTag as StringTag,
    prevContext,
    counts,
    lastArray,
    index,
  )

  return result
}

function runArrayItemDiff(
  oldKey: string,
  newValueTag: StringTag,
  prevContext: SupportContextItem,
  counts: TagCounts,
  lastArray: LastArrayItem[],
  index: number
) {
  const isDiff = newValueTag && oldKey !== newValueTag.arrayValue

  if( isDiff ) {
    destroyArrayItem(prevContext, counts)
    lastArray.splice(index, 1)
    return 2
  }

  return 0
}

export function destroyArrayItem(
  item: ContextItem,
  counts: TagCounts,
) {
  const global = item.global as SupportTagGlobal
  
  destroyArrayItemByGlobal(global, item)

  ++counts.removed
}

function destroyArrayItemByGlobal(
  global: SupportTagGlobal,
  item: ContextItem,
) {
  if(global) {
    const support = global.oldest
    destroySupport(support, global)
  } else {
    const element = item.simpleValueElm as Element
    delete item.simpleValueElm
    paintCommands.push({
      processor: paintRemover,
      args: [element],
    })
  }
}