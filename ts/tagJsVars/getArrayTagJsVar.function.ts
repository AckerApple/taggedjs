import { checkArrayValueChange } from '../tag/checkDestroyPrevious.function.js'
import { processTagArray } from '../tag/update/processTagArray.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { AnySupport } from '../tag/index.js'
import { TagJsTag, TagJsVar } from './tagJsVar.type.js'
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { SupportContextItem, Tag, TemplaterResult, TemplateValue } from '../index.js'
import { destroyArrayContext } from '../tag/destroyArrayContext.function.js'

/** how to process an array */
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
    destroy: destroyArrayContext,
  }
}

function processArrayUpdates(
  newValue: TemplateValue,
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
) {
  const tagUpdateResponse = tagValueUpdateHandler(
    newValue,
    contextItem,
    ownerSupport,
  )
  
  if(tagUpdateResponse === 0) {
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
  _insertBefore?: Text,      
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
