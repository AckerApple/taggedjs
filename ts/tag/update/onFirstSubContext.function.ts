import type { TagCounts } from '../TagCounts.type.js'
import { AnySupport } from '../AnySupport.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { SubContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'

export function onFirstSubContext(
  value: TemplateValue,
  subContext: SubContext,
  ownerSupport: AnySupport, // ownerSupport ?
  counts: TagCounts, // used for animation stagger computing
  insertBefore: Text,
) {
  subContext.hasEmitted = true
  return subContext.contextItem = createAndProcessContextItem(
    value as TemplateValue,
    ownerSupport,
    counts,
    insertBefore,
  )
}
