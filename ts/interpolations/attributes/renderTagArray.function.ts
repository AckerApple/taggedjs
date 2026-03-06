
import { AnySupport, TemplateValue } from '../../tag/index.js'
import { paint, painting } from '../../render/paint.function.js'
// import { renderSupport } from'../../render/renderSupport.function.js'

const noArgs: any[] = []

export function renderTagUpdateArray(
  supports: AnySupport[],
) {
  ++painting.locks

  for (let index = 0; index < supports.length; ++index) {
    renderTagUpdateNoPaint(supports[index] as AnySupport)
  }

  --painting.locks

  paint()
}

export function renderTagUpdate(
  support: AnySupport,
) {
  ++painting.locks
  renderTagUpdateNoPaint(support)
  --painting.locks
  paint()
}

function renderTagUpdateNoPaint(
  support: AnySupport,
) {
  const context = support.context
  context.tagJsVar.processUpdate(
    context.value as TemplateValue,
    context,
    support.ownerSupport as AnySupport,
    noArgs,
  )
}
