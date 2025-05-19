
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
  const global = support.subject.global as SupportTagGlobal
  if(!global) {
    return // while rendering a parent, a child may have been deleted (pinbowl)
  }

  renderSupport(global.newest)
}
