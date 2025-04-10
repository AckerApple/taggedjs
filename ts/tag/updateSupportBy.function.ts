import { paint, painting } from './paint.function.js'
import { processUpdateContext } from './processUpdateContext.function.js'
import { StringTag } from './StringTag.type.js'
import { AnySupport } from './getSupport.function.js'
import { DomTag, Tag } from './getDomTag.function.js'
import {SupportTagGlobal } from './getTemplaterResult.function.js'

export function updateSupportBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const global = olderSupport.subject.global as SupportTagGlobal
  const context = global.context
  
  updateSupportValuesBy(olderSupport, newerSupport)
  
  ++painting.locks
  processUpdateContext(olderSupport, context)
  --painting.locks

  paint()
}

export function updateSupportValuesBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const tempTag = (newerSupport.templater.tag || newerSupport.templater) as DomTag | StringTag
  const values = (newerSupport.templater as unknown as Tag).values || tempTag.values
  const tag = olderSupport.templater.tag as DomTag
  
  tag.values = values
}
