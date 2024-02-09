import { renderCountDiv } from "./renderCount.component.js"
import { state, html, tag, Subject, onInit } from "./taggedjs/index.js"

export const counters = tag(function Counters() {
  let _firstState = state('countersDebug.js', x => [_firstState, _firstState = x])
  let renderCount = state(0, x => [renderCount, renderCount = x])
  let _thirdState = state('countersDebug.js', x => [_thirdState, _thirdState = x])
  let initCounter = state(0, x => [initCounter, initCounter = x])
  let _forthState = state('countersDebug.js', x => [_forthState, _forthState = x])
  let counter = state(0, x => [counter, counter = x])

  onInit(() => {
    ++initCounter
    console.info('tagJsDebug.js: 👉 i should only ever run once')
  })

  const increaseCounter = () => {
    ++counter
  }

  ++renderCount // for debugging

  return html`<!--counters-->
    <div>Subscriptions:${Subject.globalSubCount$}:${Subject.globalSubs.length}</div>
    <div>initCounter:${initCounter}</div>
    <button onclick=${increaseCounter}>counter:${counter}</button>
    <button onclick=${() => console.info('subs', Subject.globalSubs)}>log subs</button>
    ${renderCountDiv(renderCount)}
  `
})
