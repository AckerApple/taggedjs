import { Clone, TagGlobal } from './getTemplaterResult.function.js'
import { SubContext } from './update/SubContext.type.js'
import { PaintCommand } from '../render/paint.function.js'
import { AnySupport, LastArrayItem } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { ContextStateMeta } from './ContextStateMeta.type.js'


export interface AppContextItem {
  returnValue?: any // used when value results in a return value
  state?: ContextStateMeta

  valueIndex: number
  
  value?: any,
  tagJsVar: TagJsVar  
  oldTagJsVar?: TagJsVar  

  // subscribe() and innerHTML
  subContext?: SubContext 

  // todo this is most likely only used by an ContextItem only
  withinOwnerElement: boolean  
}
export interface BaseContextItem extends AppContextItem {  
  element?: HTMLElement
  parentContext: BaseContextItem
  
  isAttr?: true // when a context is just one attribute definition
  isAttrs?: true // when a context is created just to house multiple attributes for one element

  contexts?: ContextItem[]
}

export interface ContextItem extends BaseContextItem {
  locked?: true
  deleted?: true
  
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
