import { checkArrayValueChange } from '../tag/checkDestroyPrevious.function.js'
import { processTagArray } from '../tag/update/arrays/processTagArray.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { AnySupport } from '../tag/index.js'
import { TagJsTag } from './TagJsTag.type.js'
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { SupportContextItem, TemplaterResult, TemplateValue } from '../index.js'
import { destroyArrayContext } from '../tag/destroyArrayContext.function.js'
import { TagJsComponent } from './tag.function.js'

/** how to process an array */
export function getArrayTagVar(
  value: any,
): TagJsTag {
  return {
    component: false,
    tagJsType: 'array',
    value,
    processInitAttribute: blankHandler,
    processInit: processArrayInit,
    processUpdate: processArrayUpdates,
    hasValueChanged: checkArrayValueChange,
    destroy: destroyArrayContext,
  }
}

function processArrayUpdates(
  newValue: TemplateValue,
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
) {
  ++contextItem.updateCount

  if(Array.isArray(newValue)) {
    processTagArray(
      contextItem,
      newValue as (TemplaterResult | TagJsComponent<any>)[],
      ownerSupport,
    )
    return
  }

  const tagUpdateResponse = tagValueUpdateHandler(
    newValue,
    contextItem,
    ownerSupport,
  )
  if(tagUpdateResponse === 0) {
    processTagArray(
      contextItem,
      newValue as any,
      ownerSupport,
    )
  }
}

function processArrayInit(
  value: TagJsTag, // TemplateValue | StringTag | SubscribeValue | SignalObject,
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
