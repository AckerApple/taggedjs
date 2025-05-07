import { paint, painting } from './paint.function.js'
import { processUpdateContext } from './processUpdateContext.function.js'
import type { DomTag } from './DomTag.type.js'
import type { Tag } from './Tag.type.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { ContextItem } from './Context.types.js'
import { AnySupport } from './AnySupport.type.js'

export function updateSupportBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const global = olderSupport.subject.global as SupportTagGlobal
  const context = global.context
  
  updateSupportValuesBy(olderSupport, newerSupport)
  
  ++painting.locks
  processUpdateContext(olderSupport, context as unknown as ContextItem[])
  --painting.locks

  paint()
}

export function updateSupportValuesBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const newTemplate = newerSupport.templater as unknown as Tag
  const tempTag = newerSupport.templater.tag as Tag
  const values = newTemplate.values || tempTag.values
  const tag = olderSupport.templater.tag as DomTag
  tag.values = values
}
