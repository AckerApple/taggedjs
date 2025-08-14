
import { AnySupport } from '../../tag/AnySupport.type.js'
import {SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { paint, painting } from '../../render/paint.function.js'
import { renderSupport } from'../../render/renderSupport.function.js'

export function renderTagUpdateArray(
  supports: AnySupport[],
) {
  ++painting.locks
  
  supports.forEach(mapTagUpdate)

  --painting.locks


  paint()
}

function mapTagUpdate(support: AnySupport) {
  const context = support.context
  const global = context.global as SupportTagGlobal
  
  if(!global) {
    return // while rendering a parent, a child may have been deleted (pinbowl)
  }

  const stateMeta = context.state
  renderSupport(stateMeta.newest as AnySupport)
}
