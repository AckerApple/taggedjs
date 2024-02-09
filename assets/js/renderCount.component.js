import { tag, html } from "./taggedjs/index.js"

export const renderCountDiv = tag(renderCount => html`<div><small>(render count ${renderCount})</small></div>`)
