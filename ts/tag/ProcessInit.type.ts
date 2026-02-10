import { ContextItem } from './ContextItem.type.js'
import { AnySupport } from './index.js'
import { AttributeContextItem } from './AttributeContextItem.type.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'

export type ProcessInit = (
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  appendTo?: Element,
) => any

export type ProcessAttribute = (
  name: string,
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  tagJsVar: TagJsTag,
  contextItem: AttributeContextItem,
  ownerSupport: AnySupport, // may not be needed?
  howToSet: HowToSet,
) => any