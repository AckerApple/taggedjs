import { renderCountDiv } from "./renderCount.component"
import { html, tag, Subject, onInit, setLet, getCallback, set, ValueSubject } from "taggedjs"

export const counters = tag(({
  appCounterSubject,
}: {
  appCounterSubject: ValueSubject<number>
}) => {  
  let counter = setLet(0)(x => [counter, counter = x])
  let propCounter = setLet(0)(x => [propCounter, propCounter = x])
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])
  let initCounter = setLet(0)(x => [initCounter, initCounter = x])

  const callbacks = getCallback()
  const callbackTestSub = set(() => new Subject())

  onInit(() => {
    ++initCounter
    console.info('countersDebug.ts: 👉 i should only ever run once')

    callbackTestSub.subscribe(x => {
      console.log('🥦 sub called')
      callbacks((y) => {
        console.log('callback increase counter', {counter, x})
        counter = x as number
      })()
    })
  })

  const increaseCounter = () => {
    ++counter
  }

  const increasePropCounter = () => {
    ++propCounter
  }

  ++renderCount // for debugging

  return html`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">

      <div>Subscriptions:${(Subject as any).globalSubCount$}</div>
      <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
      <div>initCounter:${initCounter}</div>
  
      <div>
        <button id="app-counter-subject-button"
          onclick=${() => appCounterSubject.set(appCounterSubject.value + 1)}
        >🍒 ++app subject</button>
        <span>
          🍒 <span id="app-counter-subject-button">${appCounterSubject.value}</span>
        </span>
      </div>

      <div>
        <button id="standalone-counter"
          onclick=${increaseCounter}
        >stand alone counter:${counter}</button>
        <span>
          🥦 <span id="standalone-display">${counter}</span>
        </span>
      </div>
  
      ${counter > 1 && html`
        <div>
          <button id="conditional-counter"
            onclick=${increaseCounter}
          >conditional counter:${counter}</button>
          <span>
            🥦 <span id="conditional-display">${counter}</span>
          </span>
        </div>
      `}
  
      <div>
        <button id="increase-counter"
          onclick=${increasePropCounter}
        >propCounter:${propCounter}</button>
        <span id="counter-display">${propCounter}</span>
      </div>

      <div>
        <button id="subject-increase-counter"
          onclick=${() => callbackTestSub.set(counter + 1)}
        >subject increase:</button>
        <span>
          🥦 <span id="subject-counter-display">${counter}</span>
        </span>
      </div>
    </div>
    
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

  return html`
    <button id="inner-increase-counter" onclick=${increasePropCounter}
    >propCounter:${propCounter}</button>
    <span id="inner-counter-display">${propCounter}</span>
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'inner counters'})}
  `
})
