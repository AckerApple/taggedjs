import { InputElementTargetEvent, html, states, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export const addArrayComponent = tag((
  addArrayItem: (x: any) => any
) => (
  renderCount = 0,
  _ = states(get => [renderCount] = get(renderCount)),
  __ = ++renderCount,
  handleKeyUp = (e: InputElementTargetEvent & KeyboardEvent) => {
    if (e.key === "Enter") {
        const value = e.target.value.trim();
        addArrayItem(value)
        e.target.value = "";
    }
  },
) => html`
  <input type="text" onkeyup=${handleKeyUp} onchange=${e => {addArrayItem(e.target.value);e.target.value=''}} />
  <button type="button" onclick=${addArrayItem}>add by outside</button>
  ${renderCountDiv({renderCount, name:'addArrayComponent'})}
`)
