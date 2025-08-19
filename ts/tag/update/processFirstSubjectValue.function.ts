import { ContextItem } from '../ContextItem.type.js'
import { AnySupport } from '../index.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { Tag } from '../Tag.type.js'

export function processFirstSubjectValue(
  value: TemplateValue | Tag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport | undefined {
  const tagJsVar = contextItem.tagJsVar

  return tagJsVar.processInit(
    value,
    contextItem,
    ownerSupport,
    appendTo,
    insertBefore,
  )
}
