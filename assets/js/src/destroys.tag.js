import { html, onDestroy, signal, states, tag, host } from "taggedjs";
import { renderCountDiv } from "./renderCount.component.js";
let destroyCount = signal(0); // lets use Signals
export const destroys = tag(() => (on = true, renderCount = 0, _ = states(get => [{ renderCount, on }] = get({ renderCount, on })), __ = ++renderCount, ___ = console.log('render on is ', on)) => html `
  destroyCount: <span id="destroyCount">${destroyCount}</span>
  on/off: ${on}
  
  ${on && toDestroy()}
  
  <button id="toggle-destroys" type="button"
    onclick=${() => {
    on = !on;
    console.log('on is now', on);
}}
  >${on ? 'destroy' : 'restore'}</button>
  
  ${renderCountDiv({ renderCount, name: 'destroys' })}
`);
const toDestroy = tag(() => (_ = onDestroy(() => {
    ++destroyCount.value;
    console.log('tag onDestroy called', destroyCount.value);
}), __ = console.log('toDestroy render')) => html `
  <div id="destroyable-content" style="border:1px solid orange;"
    ${host.onDestroy(() => {
    ++destroyCount.value;
    console.log('toDestroy on destroy called', destroyCount.value);
})}
  >will be destroyed</div>
`);
//# sourceMappingURL=destroys.tag.js.map