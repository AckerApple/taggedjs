import { TagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { RegularValue } from './processRegularValue.function.js'
import { Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import {  StringTag } from '../getDomTag.function.js'
import { Subject } from '../../subject/index.js'

export type InterpolateSubject = (ValueSubject<unknown>  | ValueSubject<Callback>) & {
  global: TagGlobal
}

// what can be put down with ${}
export type TemplateValue = StringTag | TemplaterResult | (StringTag | TemplaterResult)[] | RegularValue | Subject<unknown> | Callback
