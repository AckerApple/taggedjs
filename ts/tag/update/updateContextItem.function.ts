import { isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Tag.class.js'
import { getValueType } from '../getValueType.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { AnySupport } from '../Support.class.js'

/** return boolean indicated if render took place */
export function updateContextItem(
  subject: ContextItem,
  value: TemplateValue,
  ownerSupport: AnySupport,
): boolean {
  if(value === subject.value) {
    return false
    /*
    if(Object.values(ImmutableTypes).includes(valueType as ImmutableTypes)) {
      return false // its the same exact non-complex value
    }

    if(value instanceof Date) {
      return false
    }

    if(value instanceof Array) {
      processTagArray(
        subject as TagArraySubject,
        value as (TemplaterResult | StringTag)[],
        ownerSupport,
        {counts: {
          added: 0,
          removed: 0,
        }}
      )
      return false // true
    }

    // console.log('xxxxx', value, subject.value)
    return false
    */
  }

  const valueType = getValueType(value)

  subject.global.nowValueType = valueType
  
  const isSub = isSubjectInstance(value)
  if(isSub) {
    return false // emits on its own
  }

  // listeners will evaluate updated values to possibly update display(s)
  return updateExistingValue(
    subject,
    value,
    ownerSupport,
  ).rendered
}
