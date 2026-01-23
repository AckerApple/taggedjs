import { AnySupport } from '../index.js'
import { createAndProcessContextItem } from './arrays/createAndProcessContextItem.function.js'
import { SubContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'

export function onFirstSubContext(
  value: TemplateValue,
  subContext: SubContext,
  ownerSupport: AnySupport, // ownerSupport ?
  insertBefore: Text,
) {
  subContext.hasEmitted = true
  return subContext.contextItem = createAndProcessContextItem(
    value as TemplateValue,
    ownerSupport,
    [] as ContextItem[],
    insertBefore,
  )
}
