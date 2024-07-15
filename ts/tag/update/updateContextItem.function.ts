import { isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Tag.class.js'
import { getValueType } from '../getValueType.function.js'
import { ImmutableTypes } from '../ValueTypes.enum.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { AnySupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'

/** return boolean indicated if render took place */
export function updateContextItem(
  subject: ContextItem,
  value: TemplateValue,
  support: AnySupport,
  isUpdate: boolean,
): boolean {
  const valueType = getValueType(value)

  subject.global.nowValueType = valueType
  
  const isSub = isSubjectInstance(value)
  if(isSub) {
    return false // emits on its own
  }

  if(value === subject.value) {
    if(Object.values(ImmutableTypes).includes(valueType as ImmutableTypes)) {
      return false // its the same exact non-complex value
    }
  }

  // listeners will evaluate updated values to possibly update display(s)
  if(isUpdate) {
    return updateExistingValue(
      subject,
      value,
      support,
    ).rendered
  }
  
  // after rocessing update
  subject.value = value
  subject.global.lastValue = value
  return false
}
