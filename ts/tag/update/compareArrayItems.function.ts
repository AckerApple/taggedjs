import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ContextItem } from '../Context.types.js'
import {SupportTagGlobal } from '../getTemplaterResult.function.js'
import { paint, paintAfters, paintRemoves } from '../paint.function.js'
import { destroySupport } from '../destroySupport.function.js'
import { SupportContextItem } from '../getSupport.function.js'

export function compareArrayItems(
  _subTag: unknown, // used to compare arrays
  value: unknown[],
  index: number,
  lastArray: ContextItem[],
  removed: number,
  counts: Counts,
) {
  const newLength = value.length - 1
  const at = index - removed
  const lessLength = at < 0 || newLength < at
  const prevContext = lastArray[index] as SupportContextItem

  if(lessLength) {
    destroyArrayItem(prevContext, counts)
    return 1
  }

  const oldKey = lastArray[index].value.arrayValue
  const newKey = (value[index] as any).arrayValue
  if(oldKey !== newKey) {
    if(prevContext.renderCount === 0) {
      console.warn('Possible array issue. Array is attempting to create/delete same items. Either html``.key is not unique or array changes with every render', {
        oldKey,
        newKey,
      })
  
      paintAfters.push(() => {
        destroyArrayItemByGlobal(prevContext.global, prevContext)
        paintAfters.shift() // prevent endless recursion
        paint()
      })
      
      return 1
    }
  
    destroyArrayItem(prevContext, counts)
    lastArray.splice(index, 1)
    return 2
  }

  return 0
}

export function destroyArrayItem(
  item: ContextItem,
  counts: Counts,
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
    destroySupport(support)
  } else {
    const element = item.simpleValueElm as Element
    delete item.simpleValueElm
    paintRemoves.push(element)
  }
}