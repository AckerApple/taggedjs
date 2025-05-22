import { TagGlobal } from '../getTemplaterResult.function.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'

export type InterpolateSubject = (ValueSubject<unknown>  | ValueSubject<Callback>) & {
  global: TagGlobal
}
