import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js'
import { InputElementTargetEvent } from '../TagJsEvent.type'
import { ReadOnlyVar, TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { elementFunctions } from './elementFunctions.js'

export type ElementVarBase = ReadOnlyVar & {
  tagName: string
  innerHTML: any[],
  attributes: Attribute[],
  elementFunctions: typeof elementFunctions,
  
  /** Children and self contexts all together */
  contexts?: TagJsVar[]
  
  /** Just this element listeners */
  listeners: MockElmListener[]
  /** Parent and Child elements listeners */
  allListeners: MockElmListener[]
}

export type MockElmListener = [
  string,
  callback: ((e: InputElementTargetEvent)=> any) & {toCallback: any},
  // realCallback: (e: InputElementTargetEvent)=> any,
]
