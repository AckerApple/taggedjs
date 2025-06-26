import { paint, painting } from '../paint.function.js'
import { processUpdateContext } from '../../tag/processUpdateContext.function.js'
import type { DomTag } from '../../tag/DomTag.type.js'
import type { Tag } from '../../tag/Tag.type.js'
import { SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/AnySupport.type.js'

export function updateSupportBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const global = olderSupport.context.global as SupportTagGlobal
  const context = global.contexts

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
