import { isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { Context } from '../Tag.class.js'
import { getValueType } from '../getValueType.function.js'
import { ImmutableTypes } from '../ValueTypes.enum.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { AnySupport } from '../Support.class.js'

export function updateContextItem(
  context: Context,
  index: number,
  value: TemplateValue,
  support: AnySupport,
  isUpdate: boolean,
) {
  const valueType = getValueType(value)

  const subject = context[index]
  subject.global.nowValueType = valueType
  
  const isSub = isSubjectInstance(value)
  if(isSub) {
    return // emits on its own
  }

  if(value === subject.value) {
    if(Object.values(ImmutableTypes).includes(valueType as ImmutableTypes)) {
      return // its the same exact non-complex value
    }
  }

  // listeners will evaluate updated values to possibly update display(s)
  if(isUpdate) {
    updateExistingValue(
      subject,
      value,
      support,
    )
    return
  }
  
  // after rocessing update
  subject.value = value
  subject.global.lastValue = value
}
