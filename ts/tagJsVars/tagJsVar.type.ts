import { CheckSupportValueChange, CheckValueChange } from "../tag/Context.types.js"
import { ContextItem } from "../tag/ContextItem.type.js"
import { AnySupport } from "../tag/index.js"
import { ProcessInit } from "../tag/ProcessInit.type.js"
// import { ValueTypes } from "../tag/ValueTypes.enum.js"

export type TagJsVar = {
  tagJsType: string // typeof ValueTypes.tag | typeof ValueTypes.dom
  processInit: ProcessInit
  delete: ProcessDelete  
  checkValueChange: CheckValueChange | CheckSupportValueChange
  
  value?: any
}

export type ProcessDelete = (
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) => any