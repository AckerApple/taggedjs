import { Clone, TagGlobal } from './TemplaterResult.class.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { SpecialDefinition } from '../interpolations/attributes/processAttribute.function.js'

export type ContextItem = {
  isAttr?: true
  element?: Element
  howToSet?: HowToSet
  isNameOnly?: boolean
  attrName?: string
  isSpecial?: SpecialDefinition
  
  simpleValueElm?: Clone
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to

  lastArray?: Context
  global?: TagGlobal
  value?: any,

  withinOwnerElement: boolean
  checkValueChange: (value:unknown, subject: ContextItem) => number | boolean
}
export type Context = ContextItem[]
