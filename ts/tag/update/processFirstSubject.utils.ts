import { TagArraySubject } from './processTagArray.js'
import { TagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { DisplaySubject, TagSubject } from '../../subject.types.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { RegularValue } from './processRegularValue.function.js'
import { Callback } from '../../interpolations/bindSubjectCallback.function.js'
import { StringTag } from '../Tag.class.js'
import { Subject } from '../../subject/index.js'
import { TagJsSubject } from './TagJsSubject.class.js'

export type processOptions = {
  counts: Counts // used to count stagger
}

export type InterpolateSubject = (ValueSubject<any> | TagArraySubject | TagSubject | TagJsSubject<any> | DisplaySubject | ValueSubject<Callback>) & {
  global: TagGlobal
}

// what can be put down with ${}
export type TemplateValue = StringTag | TemplaterResult | (StringTag | TemplaterResult)[] | RegularValue | Subject<any> | Callback
