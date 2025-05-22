import { SpecialDefinition } from '../render/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { Clone, TagGlobal } from './getTemplaterResult.function.js'
import { SubContext } from './update/SubContext.type.js'
import { PaintCommand } from '../render/paint.function.js'
import { ContextHandler, LastArrayItem } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

export interface ContextItem {
  element?: Element

  /** Called on value update detected, within processUpdateOneContext(). Return value is ignored */
  handler?: ContextHandler
  
  // ATTRIBUTES
  isAttr?: true
  howToSet?: HowToSet
  isNameOnly?: boolean
  attrName?: string
  isSpecial?: SpecialDefinition
  
  // used only for strings, numbers, booleans
  simpleValueElm?: Clone
  paint?: PaintCommand

  // array only
  lastArray?: LastArrayItem[]

  subContext?: SubContext // subscribe() and innerHTML
  
  value?: any,
  tagJsVar?: TagJsVar
  
  // TAG SUPPORT ONLY BELOW
  global?: TagGlobal

  // ELEMENTS
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to
  withinOwnerElement: boolean
}
