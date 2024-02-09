import { renderCountDiv } from "./renderCount.component.js"
import { state, tag, html } from "./taggedjs/index.js"

export const GatewayTest = tag(function GatewayTest(
  props // : {test:number}
) {
  let renderCount = state(0, x => [renderCount, renderCount=x])

  ++renderCount
  
  return html`
    I was loaded by a gateway - props:${typeof props}:${JSON.stringify(props)}
    ${renderCountDiv(renderCount)}
  `
})