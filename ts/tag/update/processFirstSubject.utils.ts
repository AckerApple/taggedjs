import { TagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { RegularValue } from './processRegularValue.function.js'
import { Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import {  StringTag } from '../Tag.class.js'
import { Subject } from '../../subject/index.js'

export type InterpolateSubject = (ValueSubject<any>  | ValueSubject<Callback>) & {
  global: TagGlobal
}

// what can be put down with ${}
export type TemplateValue = StringTag | TemplaterResult | (StringTag | TemplaterResult)[] | RegularValue | Subject<any> | Callback
