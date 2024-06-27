import { isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { Context } from '../Tag.class.js'
import { getValueType } from '../getValueType.function.js'
import { ImmutableTypes, ValueTypes } from '../ValueTypes.enum.js'

export function updateContextItem(
  context: Context,
  index: number,
  value: TemplateValue
) {
  const valueType = getValueType(value)

  const subject = context[index]
  subject.global.nowValueType = valueType
  
  const isSub = isSubjectInstance(value)
  if(isSub) {
    return // emits on its own
  }

  if(value === subject._value) {
    if(Object.values(ImmutableTypes).includes(valueType as ImmutableTypes)) {
      return // its the same exact non-complex value
    }
  }

  // listeners will evaluate updated values to possibly update display(s)
  subject.next(value)
  
  return
}
