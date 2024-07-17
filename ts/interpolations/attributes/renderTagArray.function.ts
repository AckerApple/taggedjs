
import { AnySupport, Support } from '../../tag/Support.class.js'
import { paint, painting } from '../../tag/paint.function.js'
import { renderSupport } from'../../tag/render/renderSupport.function.js'

export function renderTagUpdateArray(
  supports: AnySupport[],
) {
  ++painting.locks

  supports.map(support => {
    return {support, renderCount: support.subject.global.renderCount}
  }).forEach(({support, renderCount}) => {
    const global = support.subject.global
    const newCount = global.renderCount

    if(renderCount !== newCount) {
      return // already rendered
    }

    if(global.deleted) {
      return // deleted
    }

    const newest = support.subject.global.newest as Support
    renderSupport(newest)  
  })

  --painting.locks
  paint()
}
