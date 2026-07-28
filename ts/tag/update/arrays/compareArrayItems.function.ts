import { LastArrayItem } from '../../Context.types.js'
import { SupportTagGlobal } from '../../getTemplaterResult.function.js'
import { destroySupport } from '../../../render/destroySupport.function.js'
import { SupportContextItem } from '../../SupportContextItem.type.js'
import type { StringTag } from '../../StringTag.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { AnySupport } from '../../AnySupport.type.js'
import { addPaintRemover } from '../../../render/paint.function.js'

export function runArrayItemDiff(
  oldKey: string,
  newValueTag: StringTag,
  prevContext: SupportContextItem,
  lastArray: LastArrayItem[],
  index: number
) {
  const keyValue = (newValueTag as any)?.arrayValue
  /*
  if( keyValue === undefined ) {
    destroyArrayItem(prevContext)
    lastArray.splice(index, 1)
    return 3
  }*/

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
  const result = destroyArrayItemByGlobal(global, context)
  destroyArrayMarkers(context)
  return result
}

function destroyArrayItemByGlobal(
  global: SupportTagGlobal,
  context: ContextItem,
) {
  if(global && context.state?.oldest) {
    const support = context.state.oldest
    return destroySupport(support, global)
  }
  
  return context.tagJsVar.destroy(context, {} as any)
}

function destroyArrayMarkers(
  context: ContextItem,
) {
  context.arrayMarkersDeleted = true

  const startMarker = context.arrayStartMarker
  if(startMarker?.parentNode) {
    addPaintRemover(startMarker, 'destroyArrayStartMarker')
  }

  const endMarker = context.placeholder
  if(endMarker?.parentNode) {
    addPaintRemover(endMarker, 'destroyArrayEndMarker')
  }
}
