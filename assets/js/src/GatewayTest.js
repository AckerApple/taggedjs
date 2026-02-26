import { renderCountDiv } from "./renderCount.component.js";
import { tag, noElement } from "taggedjs";
export const GatewayTest = tag((props) => {
    GatewayTest.updates(x => [props] = x);
    let renderCount = 0;
    ++renderCount;
    return noElement('I was loaded by a gateway - props:', typeof props, ':', _ => JSON.stringify(props), _ => renderCountDiv({ renderCount, name: 'GatewayTest.ts' }));
});
//# sourceMappingURL=GatewayTest.js.map