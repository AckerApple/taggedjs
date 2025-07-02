import { renderCountDiv } from "./renderCount.component.js";
import { states, tag, html } from "taggedjs";
export const GatewayTest = tag((props) => {
    let renderCount = 0;
    states(get => [renderCount] = get(renderCount));
    ++renderCount;
    return html `
    I was loaded by a gateway - props:${typeof props}:${JSON.stringify(props)}
    ${renderCountDiv({ renderCount, name: 'GatewayTest.ts' })}
  `;
});
//# sourceMappingURL=GatewayTest.js.map