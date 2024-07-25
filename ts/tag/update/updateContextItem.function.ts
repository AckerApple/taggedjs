import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Tag.class.js'
import { TypedValue } from '../getValueType.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { AnySupport } from '../Support.class.js'

/** return boolean indicated if render took place */
export function updateContextItem(
  contextItem: ContextItem,
  value: TemplateValue,
  ownerSupport: AnySupport,
  valueType: TypedValue,
): boolean {
  contextItem.global.nowValueType = valueType
  
  // listeners will evaluate updated values to possibly update display(s)
  const result = updateExistingValue(
    contextItem,
    value,
    ownerSupport,
  ).rendered
  
  updateOneContextValue(value, contextItem)

  return result
}

export function updateOneContextValue(
  value: TemplateValue,
  contextItem: ContextItem,
) {
  contextItem.value = value
  contextItem.global.lastValue = value
}
