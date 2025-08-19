import { ContextItem } from './ContextItem.type.js'
import { AnySupport } from './index.js'
import { TemplateValue } from './TemplateValue.type.js'

export type ProcessUpdate = (
  value: TemplateValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  values: unknown[],
) => any