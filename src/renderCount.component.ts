import { tag, html } from "taggedjs"

export const renderCountDiv = tag((
    renderCount: number,
) => html`<div><small>(render count ${renderCount})</small></div>`)
