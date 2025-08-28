import { AnySupport } from './index.js'
import { TemplateValue } from './TemplateValue.type.js'
import { ContextItem } from './ContextItem.type.js'
import { SupportContextItem } from './SupportContextItem.type.js'

export type ContextHandler = (
  value: TemplateValue,
  newSupport: AnySupport,
  contextItem: ContextItem,
  values: unknown[],
) => void

export type LastArrayItem = ContextItem // {context: ContextItem, global: TagGlobal}

/** Return 0 if no change. Any other number tells what changed */
export type CheckValueChange = (
  value: unknown,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) => number

export type CheckSupportValueChange = (
  value: unknown,
  contextItem: SupportContextItem,
) => number