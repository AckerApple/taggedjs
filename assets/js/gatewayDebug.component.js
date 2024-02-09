import { GatewayTest } from "./GatewayTest.js"
import { renderCountDiv } from "./renderCount.component.js"
import { state, html, tag, tagGateway } from "./taggedjs/index.js"

export const gatewayDebug = tag(function gatewayDebug() {
  let renderCount = state(0, x => [renderCount, renderCount = x])

  const gatewayData = state({test: 22})

  ++renderCount

  return html`
    <div id=${tagGateway(GatewayTest).id} props=${JSON.stringify(gatewayData)}></div>
    <button onclick=${() => ++gatewayData.test}>increase ${gatewayData.test}</button>
    ${renderCountDiv(renderCount)}
  `
})
