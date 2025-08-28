import { CheckValueChange } from "../tag/Context.types.js"
import { ContextItem } from "../tag/ContextItem.type.js"
import { AnySupport } from "../tag/index.js"
import { ProcessAttribute, ProcessInit } from "../tag/ProcessInit.type.js"
import { ProcessUpdate } from "../tag/ProcessUpdate.type.js"

export type ReadOnlyVar = {
  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom
  processInitAttribute: ProcessAttribute
  processInit: ProcessInit
  processUpdate: ProcessUpdate
  checkValueChange: CheckValueChange // | CheckSupportValueChange
  destroy: ProcessDelete
}

export type TagJsVar = ReadOnlyVar & {
  isAttr?: true  
  value?: any
  
  /** Optional method to check if this TagJsVar matches an injection request */
  matchesInjection?: MatchesInjection
}

export type MatchesInjection = (inject: any) => boolean

export type TagJsTag = TagJsVar & {
  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom

  processInit: ProcessInit
  destroy: ProcessDelete
  
  value?: any
}

export type ProcessDelete = (
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) => any