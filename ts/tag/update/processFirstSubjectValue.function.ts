import type { TagCounts } from '../../tag/TagCounts.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { Tag } from '../Tag.type.js'

export function processFirstSubjectValue(
  value: TemplateValue | Tag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport | undefined {
  // const tagJsVar = valueToTagJsVar(value)
  // contextItem.tagJsVar = tagJsVar
  const tagJsVar = contextItem.tagJsVar

  return tagJsVar.processInit(
    value,
    contextItem,
    ownerSupport,
    counts,
    appendTo,
    insertBefore,
  )
}
