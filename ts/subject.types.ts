import { BaseSupport, Support } from './tag/Support.class.js'
import { ContextItem } from './tag/Tag.class.js'

export type WasTagSubject = ContextItem & {
  support?: BaseSupport | Support
}

export type TagSubject = ContextItem & {
  support: Support
}

export type RegularValue = string | number | boolean
