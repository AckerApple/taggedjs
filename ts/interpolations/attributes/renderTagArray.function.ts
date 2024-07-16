
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

    // ??? not sure if used
    if(renderCount !== newCount) {
      return // already rendered
    }

    // ??? not sure if used
    if(global.deleted) {
      return // deleted
    }
    
    const newest = support.subject.global.newest as Support
    renderSupport(
      newest,
      false, // renderUp - callback may have changed props so also check to render up
    )  
  })

  --painting.locks
  paint()
}
