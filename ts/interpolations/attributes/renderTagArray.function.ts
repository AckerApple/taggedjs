
import { AnySupport } from '../../tag/getSupport.function.js'
import {SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { paint, painting } from '../../tag/paint.function.js'
import { renderSupport } from'../../tag/render/renderSupport.function.js'

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
