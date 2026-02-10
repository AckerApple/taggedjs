import { Clone, TagGlobal } from './getTemplaterResult.function.js'
import { SubContext } from './update/SubContext.type.js'
import { PaintCommand } from '../render/paint.function.js'
import { Events, LastArrayItem, Subject } from '../index.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import { ContextStateMeta } from './ContextStateMeta.type.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'


export interface AppContextItem {
  /** automatically updated with every update */
  value?: any,

  /** Not updated automatically. processUpdate has the option to set this value */
  tagJsVar: TagJsTag
  updateCount: number

  returnValue?: any // used when value results in a return value
  
  state?: ContextStateMeta
  htmlDomMeta?: DomObjectChildren

  /** only for html`` . When -1 then its a raw bolt value */
  valueIndex: number

  /** TODO: is this deprecated? */
  oldTagJsVar?: TagJsTag  

  // subscribe() and innerHTML
  subContext?: SubContext 

  // todo this is most likely only used by an ContextItem only
  withinOwnerElement: boolean  

  destroy$: Subject<void> // not present on non-tags
  /** emits during update cycle (before paint() flush) so tag.onRender/watch hooks can run */
  render$: Subject<void> // not present on non-tags

  // only appears on app
  events?: Events
}
export interface BaseContextItem extends AppContextItem {  
  target?: HTMLElement
  parentContext: BaseContextItem
  
  isAttr?: true // when a context is just one attribute definition
  isAttrs?: true // when a context is created just to house multiple attributes for one element

  contexts?: ContextItem[]

    
  /** Argument aka Prop updates */
  inputsHandler?: (...args: any[]) => any

  /** Argument aka Prop updates */
  updatesHandler?: (...args: any[]) => any
}

export interface ContextItem extends BaseContextItem {
  /** number represent reason for the lock */
  locked?: number
  deleted?: true
  
  // used only for strings, numbers, booleans
  simpleValueElm?: Clone
  /** pending paint command for simple/regular values before the DOM node is committed */
  paint?: PaintCommand

  // array only
  lastArray?: LastArrayItem[]
  arrayValue?: any
  
  // TAG SUPPORT ONLY BELOW
  global?: TagGlobal

  // ELEMENTS
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to
}

export type ElementContext = ContextItem & {
  /** paint commands queued for this context's element work */
  paintCommands?: PaintCommand[]
}