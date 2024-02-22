import { GatewayTest } from "./GatewayTest.js"
import { renderCountDiv } from "./renderCount.component.js"
import { state, html, tag, tagGateway } from "taggedjs"

export const gatewayDebug = tag(function gatewayDebug() {
  let renderCount: number = state(0)(x => [renderCount, renderCount = x])

  const gatewayData = state({test: 22})()

  ++renderCount

  return html`
    <div id=${tagGateway(GatewayTest).id} props=${JSON.stringify(gatewayData)}></div>
    <button id="increase-gateway-count" onclick=${() => ++gatewayData.test}>increase ${gatewayData.test}</button>
    <span id="display-gateway-count">${gatewayData.test}</span>
    ${renderCountDiv({renderCount, name: 'gatewayDebug.component.ts'})}
  `
})
