import { Clone, TagGlobal } from './TemplaterResult.class.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { SpecialDefinition } from '../interpolations/attributes/processAttribute.function.js'
import { InterpolateSubject } from './update/processFirstSubject.utils.js'

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
  checkValueChange: (value:unknown, subject: ContextItem) => number | boolean
}
export type Context = ContextItem[]
