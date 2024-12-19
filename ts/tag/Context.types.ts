import { SpecialDefinition } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { InterpolateSubject } from './update/processFirstSubject.utils.js'
import { Clone, TagGlobal } from './getTemplaterResult.function.js'
import {SupportContextItem } from './getSupport.function.js'

export type ContextItem = {
  isAttr?: true
  element?: Element
  howToSet?: HowToSet
  isNameOnly?: boolean
  attrName?: string
  isSpecial?: SpecialDefinition
  
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to
  
  // used only for strings, numbers, booleans
  simpleValueElm?: Clone

  // array only
  lastArray?: Context

  // observable as variable
  subject?: InterpolateSubject
  
  global?: TagGlobal
  value?: any,

  withinOwnerElement: boolean
  checkValueChange: CheckValueChange | CheckSupportValueChange
}
export type Context = ContextItem[]

export type CheckValueChange = (value:unknown, subject: ContextItem) => number | boolean
export type CheckSupportValueChange = (value:unknown, subject:SupportContextItem) => number | boolean