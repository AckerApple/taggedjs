import { SupportContextItem } from '../SupportContextItem.type.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { AnySupport } from '../index.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'

/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(
  newValue: TemplateValue, // newValue
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
): number {
  // calls processDesignElementUpdate
  const result = contextItem.tagJsVar.processUpdate(
    newValue, contextItem, ownerSupport, []
  )

  contextItem.value = newValue

  return result || 0
}
