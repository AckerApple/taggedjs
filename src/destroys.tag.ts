import { onDestroy, signal, tag, host, span, button, div, noElement } from "taggedjs"
import { renderCountDiv } from "./renderCount.component.js"

let destroyCount = signal(0) // lets use Signals
let destroyTagCount = signal(0) // lets use Signals

export const destroys = tag(() => (
  on = true,
  tagOn = true,
  renderCount = 0,
) => div(
  'destroyCount: ',
  span.id`destroyCount`(_=> destroyCount),
  'on/off: ', _=> on,
  
  div(
    'HostDestroy:',
    _=> on && toDestroyHost(),
  ),
  
  div(
    'TagDestroy:',
    span.id`destroyTagCount`(_=> destroyTagCount),
    ':',
    _=> tagOn && toDestroyTag(),
  ),

  button({
    id:"toggle-destroys", type:"button",
    onClick: () => {
      on = !on
    },
  }, _=> on ? 'destroy' : 'restore'),

  button({
    id:"toggle-tag-destroys", type:"button",
    onClick: () => {
      tagOn = !tagOn
    },
  }, _=> on ? 'destroy tag' : 'restore tag'),
  
  () => renderCountDiv({renderCount: ++renderCount, name: 'destroys'}),
))

const toDestroyHost = tag(() =>
  div({
      attr: host.onDestroy(() => {
        ++destroyCount.value
      }),
      id:"destroyable-content",
      style:"border:1px solid orange;"
    },
    'will be destroyed'
  )
)

const toDestroyTag = tag(() => {
  onDestroy(() => {
    ++destroyTagCount.value
    console.log('xxx')
  })
  
  return div({
      id:"destroyable-tag-content",
      style:"border:1px solid orange;"
    },
    'tag will be destroyed'
  )
})
