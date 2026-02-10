import { HasValueChanged } from "../tag/Context.types.js"
import { ContextItem } from "../tag/ContextItem.type.js"
import { AnySupport, KeyFunction } from "../tag/index.js"
import { ProcessAttribute, ProcessInit } from "../tag/ProcessInit.type.js"
import { ProcessUpdate } from "../tag/ProcessUpdate.type.js"

export type ReadOnlyVar = {
  component: false

  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom
  processInitAttribute: ProcessAttribute
  processInit: ProcessInit
  processUpdate: ProcessUpdate
  hasValueChanged: HasValueChanged // | CheckSupportValueChange
  destroy: ProcessDelete
}


export type TagJsTagBasics = {
  isAttr?: true  
  value?: any
  
  /** Optional method to check if this TagJsTag matches an injection request */
  matchesInjection?: MatchesInjection
}

export type MatchesInjection = (inject: any, context: ContextItem) => ContextItem | void

export type TagJsTag = ReadOnlyVar & TagJsTagBasics & {
  component: false
  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom

  processInit: ProcessInit
  destroy: ProcessDelete
  
  value?: any
}

export type ProcessDelete = (
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) => any