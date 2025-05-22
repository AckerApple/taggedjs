import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js'
import { AnySupport } from '../tag/AnySupport.type.js'

export type Template = Element & { content: any }
export type InterpolateComponentResult = {
  subject: InterpolateSubject
  insertBefore: Element | Text | Template
  ownerSupport: AnySupport
  variableName: string
}
