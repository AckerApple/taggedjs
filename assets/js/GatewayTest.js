import { renderCountDiv } from "./renderCount.component.js";
import { state, tag, html } from "taggedjs";
export const GatewayTest = tag((props) => {
    let renderCount = state(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return html `
    I was loaded by a gateway - props:${typeof props}:${JSON.stringify(props)}
    ${renderCountDiv({ renderCount, name: 'GatewayTest.ts' })}
  `;
});
//# sourceMappingURL=GatewayTest.js.map