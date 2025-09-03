import { SupportContextItem } from '../SupportContextItem.type.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { AnySupport } from '../index.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'

/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(
  newValue: TemplateValue, // newValue
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
): number {
  if((newValue as any)?.tagJsType === 'element') {
    // if(contextItem.locked) {
    //   return 0
    // }
    
    contextItem.tagJsVar.processUpdate(
      newValue, contextItem, ownerSupport, []
    )

    contextItem.value = newValue

    return 0
  }

  // Do not continue if the value is just the same
  if(newValue === contextItem.value) {
    return 0
  }

  return forceUpdateExistingValue(
    contextItem,
    newValue,
    ownerSupport,
  )
}
