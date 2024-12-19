import { html, onDestroy, signal, states, tag } from "taggedjs"
import { renderCountDiv } from "./renderCount.component.js"

let destroyCount = signal(0) // lets use Signals

export const destroys = tag(() => (
  on = true,
  renderCount = 0,
  _ = states(get => [{renderCount, on}] = get({renderCount, on})),
  __ = ++renderCount,
) => html`
  destroyCount: <span id="destroyCount">${destroyCount}</span>
  ${ on && toDestroy() }
  
  <button id="toggle-destroys" type="button"
    onclick=${() => on = !on}
  >${on ? 'destroy' : 'restore'}</button>
  
  ${renderCountDiv({renderCount, name: 'destroys'})}
`)

const toDestroy = tag(() => (
  _ = onDestroy(() => ++destroyCount.value)
) => html`
  <div id="destroyable-content" style="border:1px solid orange;"
    ondestroy=${() => ++destroyCount.value}
  >will be destroyed</div>
`)