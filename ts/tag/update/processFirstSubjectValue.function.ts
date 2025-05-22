import type { TagCounts } from '../../tag/TagCounts.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { Tag } from '../Tag.type.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | Tag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: TagCounts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport | undefined {
  const tagJsVar = valueToTagJsVar(value)
  contextItem.tagJsVar = tagJsVar

  return (tagJsVar as any).processInit(
    value,
    contextItem,
    ownerSupport,
    counts,
    appendTo,
    insertBefore,
  )
}
