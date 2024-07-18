import { html } from "taggedjs"

export const renderCountDiv = (
  {renderCount, name}: {
    renderCount: number
    name: string
  }
) => html`
  <div>
    <small>(${name} render count <span id=${name+'_render_count'}>${renderCount}</span>)</small>
  </div>
`
