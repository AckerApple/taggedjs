import { ContextItem } from './ContextItem.type.js'
import { AnySupport } from './AnySupport.type.js'
import { AttributeContextItem } from './AttributeContextItem.type.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

export type ProcessInit = (
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  appendTo?: Element,      
  insertBefore?: Text,      
) => any

export type ProcessAttribute = (
  name: string,
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  tagJsVar: TagJsVar,
  contextItem: AttributeContextItem,
  ownerSupport: AnySupport,
) => any