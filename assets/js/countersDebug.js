import { state, html, tag, Subject, onInit } from "./taggedjs/index.js"

export const counters = tag(function Counters() {
  let renderCount = state(0, x => [renderCount, renderCount = x])
  let initCounter = state(0, x => [initCounter, initCounter = x])
  let counter = state(0, x => [counter, counter = x])

  onInit(() => {
    ++initCounter
    console.info('tagJsDebug.js: 👉 i should only ever run once')

    Subject.globalSubCount$.subscribe(value => {
      console.log('sub count',value)
    })  
  })

  const increaseCounter = () => {
    ++counter
  }

  ++renderCount // for debugging

  return html`<!--counters-->
    <fieldset id="counters">
      <legend>counters</legend>
      <div>Subscriptions:${Subject.globalSubCount$}:${Subject.globalSubs.length}</div>
      <div>renderCount:${renderCount}</div>
      <div>initCounter:${initCounter}</div>
      <button onclick=${increaseCounter}>counter:${counter}</button>
      <button onclick=${() => console.info('subs', Subject.globalSubs)}>log subs</button>
    </fieldset>
  `
})
