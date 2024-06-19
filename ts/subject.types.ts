import { BaseSupport, Support } from './tag/Support.class.js'
import { TemplaterResult } from './tag/TemplaterResult.class.js'
import { Subject } from './subject/Subject.class.js'
import { TagJsSubject } from './tag/update/TagJsSubject.class.js'

export type WasTagSubject = Subject<TemplaterResult> & {
  support?: BaseSupport | Support
}

export type TagSubject = TagJsSubject<Support> & {
  support: Support
}

export type RegularValue = string | number | boolean
export type DisplaySubject = TagJsSubject<RegularValue> & Subject<RegularValue> & {
  lastValue?: RegularValue
}
