import { renderCountDiv } from "./renderCount.component"
import { html, tag, Subject, onInit, setLet } from "taggedjs"

export const counters = tag(() => {  
  let counter = setLet(0)(x => [counter, counter = x])
  let propCounter = setLet(0)(x => [propCounter, propCounter = x])
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])
  let initCounter = setLet(0)(x => [initCounter, initCounter = x])

  onInit(() => {
    ++initCounter
    console.info('tagJsDebug.js: 👉 i should only ever run once')
  })

  const increaseCounter = () => {
    ++counter
    console.log('counter increased', counter)
  }

  const increasePropCounter = () => {
    ++propCounter
    console.log('propCounter increased', propCounter)
  }

  ++renderCount // for debugging

  console.log('---- parent render ----')

  return html`<!--counters-->
    <div>Subscriptions:${(Subject as any).globalSubCount$}</div>
    <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
    <div>initCounter:${initCounter}</div>

    <button id="increase-standalone-counter"
      onclick=${increaseCounter}
    >counter:${counter}</button>
    <span id="counter-standalone-display">${counter}</span>

    <button id="increase-counter"
      onclick=${increasePropCounter}
    >propCounter:${propCounter}</button>
    <span id="counter-display">${propCounter}</span>
    
    <fieldset>
      <legend>inner counter</legend>
      ${innerCounters({propCounter, increasePropCounter})}
    </fieldset>
    ${renderCountDiv({renderCount, name: 'counters'})}
  `
})

const innerCounters = tag(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])

  ++renderCount // for debugging

  console.log('---- inner counters ----', {propCounter, renderCount})

  return html`
    <button id="inner-increase-counter" onclick=${increasePropCounter}
    >propCounter:${propCounter}</button>
    <span id="inner-counter-display">${propCounter}</span>
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'inner counters'})}
  `
})
