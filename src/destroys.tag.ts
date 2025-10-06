import { onDestroy, signal, tag, host, span, button, div, noElement } from "taggedjs"
import { renderCountDiv } from "./renderCount.component.js"

let destroyCount = signal(0) // lets use Signals

export const destroys = tag(() => (
  on = true,
  renderCount = 0,
  __ = ++renderCount,
) => noElement(
  'destroyCount: ',
  span({id:"destroyCount"}, _=> destroyCount),
  'on/off: ', _=> on,

  _=> on && toDestroy(),

  button({
    id:"toggle-destroys", type:"button",
    onClick: () => {
      on = !on
    },
  }, _=> on ? 'destroy' : 'restore'),
  
  () => renderCountDiv({renderCount, name: 'destroys'}),
))

const toDestroy = tag(() => (
  _ = onDestroy(() => ++destroyCount.value),
) =>
  div.attr(host.onDestroy(() => {
    ++destroyCount.value
  }))({
    id:"destroyable-content", style:"border:1px solid orange;"
  },'will be destroyed')
)