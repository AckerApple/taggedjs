import { CheckSupportValueChange, CheckValueChange } from "../tag/Context.types.js"
import { ContextItem } from "../tag/ContextItem.type.js"
import { AnySupport } from "../tag/index.js"
import { ProcessAttribute, ProcessInit } from "../tag/ProcessInit.type.js"
import { ProcessUpdate } from "../tag/ProcessUpdate.type.js"

export type TagJsVar = {
  isAttr?: true
  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom

  processInitAttribute: ProcessAttribute
  processInit: ProcessInit
  processUpdate: ProcessUpdate
  delete: ProcessDelete  
  
  value?: any
  checkValueChange: CheckValueChange | CheckSupportValueChange
}

export type TagJsTag = TagJsVar & {
  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom

  processInit: ProcessInit
  delete: ProcessDelete
  
  value?: any
}

export type ProcessDelete = (
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) => any