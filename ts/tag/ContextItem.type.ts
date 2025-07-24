import { Clone, TagGlobal } from './getTemplaterResult.function.js'
import { SubContext } from './update/SubContext.type.js'
import { PaintCommand } from '../render/paint.function.js'
import { LastArrayItem } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

export interface BaseContextItem {
  valueIndex: number
  valueIndexSetBy: string
  
  value?: any,
  tagJsVar: TagJsVar  
  oldTagJsVar?: TagJsVar  

  // subscribe() and innerHTML
  subContext?: SubContext 

  // todo this is most likely only used by an ContextItem only
  withinOwnerElement: boolean
}

export interface ContextItem extends BaseContextItem {
  locked?: true
  
  // used only for strings, numbers, booleans
  simpleValueElm?: Clone
  paint?: PaintCommand

  // array only
  lastArray?: LastArrayItem[]
  
  // TAG SUPPORT ONLY BELOW
  global?: TagGlobal

  // ELEMENTS
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to
}
