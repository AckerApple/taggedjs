import { html, letState, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
export const addArrayComponent = tag((addArrayItem) => (renderCount = letState(0)(x => [renderCount, renderCount = x]), _ = ++renderCount, handleKeyUp = (e) => {
    if (e.key === "Enter") {
        const value = e.target.value.trim();
        addArrayItem(value);
        e.target.value = "";
    }
}) => html `
  <input type="text" onkeyup=${handleKeyUp} onchange=${e => { addArrayItem(e.target.value); e.target.value = ''; }} />
  <button type="button" onclick=${addArrayItem}>add by outside</button>
  ${renderCountDiv({ renderCount, name: 'addArrayComponent' })}
`);
//# sourceMappingURL=addArrayComponent.tag.js.map