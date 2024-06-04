import { isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { Context } from '../Tag.class.js'

export function updateContextItem(
  context: Context,
  variableName: string,
  value: TemplateValue
) {
  const subject = context[variableName]

  if(isSubjectInstance(value)) {
    return // emits on its own
  }

  // listeners will evaluate updated values to possibly update display(s)
  subject.next(value)
  
  return
}
