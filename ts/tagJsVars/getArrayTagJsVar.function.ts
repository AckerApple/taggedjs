import { checkArrayValueChange, destroyArrayContextItem } from '../tag/checkDestroyPrevious.function.js'
import { processTagArray } from '../tag/update/processTagArray.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { TagJsTag, TagJsVar } from './tagJsVar.type.js'
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { SupportContextItem, Tag, TemplaterResult, TemplateValue } from '../index.js'

export function getArrayTagVar(
  value: any,
): TagJsTag {
  return {
    tagJsType: 'array',
    value,
    processInitAttribute: blankHandler,
    processInit: processArrayInit,
    processUpdate: processArrayUpdates,
    checkValueChange: checkArrayValueChange,
    delete: destroyArrayContextItem,
  }
}

function processArrayUpdates(
  newValue: TemplateValue,
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
) {
  /*
  if( newValue === contextItem.value) {
    return
  }
  */

  const tagUpdateResponse = tagValueUpdateHandler(
    newValue,
    contextItem,
    ownerSupport,
  )
  
  if(tagUpdateResponse === -1) {
    processTagArray(
      contextItem,
      newValue as (TemplaterResult | Tag)[],
      ownerSupport,
    )
  }
}

function processArrayInit(
  value: TagJsVar, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  appendTo?: Element,      
) {
  const subValue = value as any

  processTagArray(
    contextItem,
    subValue,
    ownerSupport,
    appendTo,
  )
}
