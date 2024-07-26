
import { AnySupport, Support } from '../../tag/Support.class.js'
import { SupportTagGlobal } from '../../tag/TemplaterResult.class.js'
import { paint, painting } from '../../tag/paint.function.js'
import { renderSupport } from'../../tag/render/renderSupport.function.js'

export function renderTagUpdateArray(
  supports: AnySupport[],
) {
  ++painting.locks

  supports.forEach(function mapTagUpdate(support, index) {
    const global = support.subject.global as SupportTagGlobal
    const newest = global.newest as Support
    renderSupport(newest)  
  })

  --painting.locks

  paint()
}
