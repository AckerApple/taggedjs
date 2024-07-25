
import { AnySupport, Support } from '../../tag/Support.class.js'
import { paint, painting } from '../../tag/paint.function.js'
import { renderSupport } from'../../tag/render/renderSupport.function.js'

export function renderTagUpdateArray(
  supports: AnySupport[],
) {
  ++painting.locks

  supports.forEach(function mapTagUpdate(support) {
    const global = support.subject.global

    if(global.deleted) {
      return
    }

    const newest = support.subject.global.newest as Support
    renderSupport(newest)  
  })

  --painting.locks

  paint()
}
