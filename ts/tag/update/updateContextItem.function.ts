import { isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { Context } from '../Tag.class.js'

export function updateContextItem(
  context: Context,
  index: number,
  value: TemplateValue
) {
  const subject = context[index]
  const isSub = isSubjectInstance(value)
  if(isSub) {
    return // emits on its own
  }

  // listeners will evaluate updated values to possibly update display(s)
  subject.next(value)
  
  return
}
