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
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js'

/** how to process an array */
export function getArrayTagVar(
  value: any,
): TagJsTag<any> {
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

  const TagJsTag = contextItem.tagJsVar as TagJsTag<any>
  const ignoreOrDestroyed = TagJsTag.hasValueChanged(
    newValue,
    contextItem as unknown as SupportContextItem,
    ownerSupport,
  )
  
  if( ignoreOrDestroyed ) {
    destroyArrayContext(contextItem)
    updateToDiffValue(
      newValue,
      contextItem,
      ownerSupport,
      ignoreOrDestroyed,
    )
    return ignoreOrDestroyed
  }
  // ignore
  /*
  if( ignoreOrDestroyed === 0 ) {
    return ignoreOrDestroyed // do nothing
  }
  /*
/*
  updateToDiffValue(
    newValue,
    contextItem,
    ownerSupport,
    ignoreOrDestroyed,
  )

  return ignoreOrDestroyed
*/

  if(Array.isArray(newValue)) {
    processTagArray(
      contextItem,
      newValue as (TemplaterResult | TagJsComponent<any>)[],
      ownerSupport,
    )
    return 0
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

    return 0
  }

  return 1
}

function processArrayInit(
  value: TagJsTag<any>, // TemplateValue | StringTag | SubscribeValue | SignalObject,
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
