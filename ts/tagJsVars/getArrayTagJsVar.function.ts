import { checkArrayValueChange, destroyArrayContextItem } from '../tag/checkDestroyPrevious.function.js'
import type { TagCounts } from '../tag/TagCounts.type.js'
import { processTagArray } from '../tag/update/processTagArray.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { TagJsVar } from './tagJsVar.type.js'


export function getArrayTagVar(
  value: any,
): TagJsVar {
  return {
    tagJsType: 'array',
    value,
    processInit: processArrayInit,
    checkValueChange: checkArrayValueChange,
    delete: destroyArrayContextItem,
  }
}

function processArrayInit(
  value: TagJsVar, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts, // {added:0, removed:0}
  appendTo?: Element,      
) {
  const subValue = value as any

  processTagArray(
    contextItem,
    subValue,
    ownerSupport,
    counts,
    appendTo,
  )
}
