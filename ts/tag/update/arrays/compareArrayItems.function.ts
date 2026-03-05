import { LastArrayItem } from '../../Context.types.js'
import { SupportTagGlobal } from '../../getTemplaterResult.function.js'
import { destroySupport } from '../../../render/destroySupport.function.js'
import { SupportContextItem } from '../../SupportContextItem.type.js'
import type { StringTag } from '../../StringTag.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { AnySupport } from '../../AnySupport.type.js'

export function runArrayItemDiff(
  oldKey: string,
  newValueTag: StringTag,
  prevContext: SupportContextItem,
  lastArray: LastArrayItem[],
  index: number
) {
  const keyValue = (newValueTag as any).arrayValue
  const newKey = keyValue || index

  let isDiff = oldKey !== newKey
  if( isDiff === false && keyValue === undefined ) {
    const hasChanged = prevContext.tagJsVar.hasValueChanged(
      newValueTag,
      prevContext,
      undefined as any as AnySupport
    )

    if ( hasChanged ) {
      isDiff = true
    }
  }

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