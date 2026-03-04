
import { AnySupport, TemplateValue } from '../../tag/index.js'
import { paint, painting } from '../../render/paint.function.js'
// import { renderSupport } from'../../render/renderSupport.function.js'

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
  context.tagJsVar.processUpdate(
    context.value as TemplateValue,
    context,
    support.ownerSupport as AnySupport,
    [],
  )
}
