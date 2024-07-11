import { BaseSupport, Support } from './tag/Support.class.js'
import { Subject } from './subject/Subject.class.js'
import { ContextItem } from './tag/Tag.class.js'

export type WasTagSubject = ContextItem & {
  support?: BaseSupport | Support
}

export type TagSubject = ContextItem & {
  support: Support
}

export type RegularValue = string | number | boolean
export type DisplaySubject = ContextItem & Subject<RegularValue> & {
  lastValue?: RegularValue
}
