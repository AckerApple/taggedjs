import { paint, painting } from '../paint.function.js'
import { processUpdateContext } from '../../tag/processUpdateContext.function.js'
import type { DomTag } from '../../tag/DomTag.type.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport, TagJsComponent } from '../../tag/index.js'

export function updateSupportBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const contexts = olderSupport.context.contexts

  updateSupportValuesBy(olderSupport, newerSupport)

  ++painting.locks
  processUpdateContext(
    olderSupport,
    contexts as unknown as ContextItem[],
  )
  --painting.locks
  
  paint()
}

function updateSupportValuesBy(
  olderSupport: AnySupport,
  newerSupport: AnySupport,
) {
  const newTemplate = newerSupport.templater as unknown as TagJsComponent<any>
  const tempTag = newerSupport.templater.tag as TagJsComponent<any>
  const values = newTemplate.values || tempTag.values
  
  const tag = olderSupport.templater.tag as DomTag
  tag.values = values
}
