import { tag, html } from "taggedjs"

export const renderCountDiv = tag((
  {renderCount, name}: {
    renderCount: number
    name: string
  }
) => html`<div><small>(${name} render count <span name=${name+'_render_count'}>${renderCount}</span>)</small></div>`)
