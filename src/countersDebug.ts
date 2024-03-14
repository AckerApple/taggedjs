import { renderCountDiv } from "./renderCount.component"
import { html, tag, Subject, onInit, setLet } from "taggedjs"

export const counters = tag(() => {  
  let counter = setLet(0)(x => [counter, counter = x])
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])
  let initCounter = setLet(0)(x => [initCounter, initCounter = x])

  onInit(() => {
    ++initCounter
    console.info('tagJsDebug.js: 👉 i should only ever run once')
  })

  const increaseCounter = () => {
    ++counter
  }

  ++renderCount // for debugging

  return html`<!--counters-->
    <div>Subscriptions:${(Subject as any).globalSubCount$}</div>
    <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
    <div>initCounter:${initCounter}</div>
    <button id="increase-counter" onclick=${increaseCounter}>counter:${counter}</button>
    <span id="counter-display">${counter}</span>
    <fieldset>
      <legend>inner counter</legend>
      ${innerCounters({counter, increaseCounter})}
    </fieldset>
    ${renderCountDiv({renderCount, name: 'counters'})}
  `
})

const innerCounters = tag(({counter, increaseCounter}) => {
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])

  ++renderCount // for debugging

return html`
    <button id="inner-increase-counter" onclick=${increaseCounter}
    >counter:${counter}</button>
    <span id="inner-counter-display">${counter}</span>
    renderCount:${renderCount}
    ${/*renderCountDiv({renderCount, name: 'inner counters'})*/false}
  `
})
