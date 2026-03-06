
import { AnySupport, TemplateValue } from '../../tag/index.js'
import { paint, painting } from '../../render/paint.function.js'
// import { renderSupport } from'../../render/renderSupport.function.js'

export function renderTagUpdateArray(
  supports: AnySupport[],
) {
  ++painting.locks

  for (let index = 0; index < supports.length; ++index) {
    const support = supports[index] as AnySupport
    const context = support.context
    context.tagJsVar.processUpdate(
      context.value as TemplateValue,
      context,
      support.ownerSupport as AnySupport,
      [],
    )
  }

  --painting.locks

  paint()
}
