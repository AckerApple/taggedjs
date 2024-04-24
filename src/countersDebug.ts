import { mouseOverTag } from "./mouseover.tag"
import { renderCountDiv } from "./renderCount.component"
import { html, tag, Subject, onInit, letState, callbackMaker, state } from "taggedjs"

export const counters = tag(({
  appCounterSubject,
}: {
  appCounterSubject: Subject<number>
}) => {  
  let counter = letState(0)(x => [counter, counter = x])
  let propCounter = letState(0)(x => [propCounter, propCounter = x])
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let initCounter = letState(0)(x => [initCounter, initCounter = x])
  let memory = state(() => ({counter: 0}))

  const callback = callbackMaker()
  const callbackTestSub = state(() => new Subject())

  onInit(() => {
    ++initCounter
    console.info('countersDebug.ts: 👉 i should only ever run once')

    callbackTestSub.subscribe(x => {
      callback((y) => {
        counter = x as number
      })()
    })
  })

  const increaseCounter = () => {
    ++counter
  }

  const increasePropCounter = () => ++propCounter

  ++renderCount // for debugging

  const sharedMemory = true
  const testInnerCounters = true
  const displayRenderCounters = true
  const testBasics = true

  return html`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${testBasics && html`
        <div>Subscriptions:${(Subject as any).globalSubCount$}</div>
        <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
        <div>initCounter:${initCounter}</div>
    
        <div>
          <button id="app-counter-subject-button"
            onclick=${() => appCounterSubject.set((appCounterSubject.value || 0) + 1)}
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
          <button id="❤️-increase-counter"
            onclick=${increasePropCounter}
          >❤️ propCounter:${propCounter}</button>
          <span>
            ❤️ <span id="❤️-counter-display">${propCounter}</span>
            </span>
        </div>

        <div>
          <button id="subject-increase-counter"
            onclick=${() => callbackTestSub.set(counter + 1)}
          >subject increase:</button>
          <span>
            🥦 <span id="subject-counter-display">${counter}</span>
          </span>
        </div>
      `}
    </div>

    ${sharedMemory && html`
      <fieldset>
        <legend>shared memory</legend>
        <div style="display:flex;flex-wrap:wrap;gap:.5em">
          ${mouseOverTag({label: 'a-a-😻', memory})}
          ${mouseOverTag({label: 'b-b-😻', memory})}
        </div>
        memory.counter:😻${memory.counter}
        <button onclick=${() => ++memory.counter}>increase 😻</button>
      </fieldset>
    `}
    
    ${testInnerCounters && html`
      <fieldset>
        <legend>inner counter</legend>
        ${innerCounters({propCounter, increasePropCounter})}
      </fieldset>
    `}
    ${displayRenderCounters && renderCountDiv({renderCount, name: 'counters'})}
  `
})

const innerCounters = tag(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])

  ++renderCount // for debugging

  return html`
    <button id="❤️-inner-counter" onclick=${increasePropCounter}
    >❤️ propCounter:${propCounter}</button>
    <span>
      ❤️ <span id="❤️-inner-display">${propCounter}</span>
    </span>
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'inner counters'})}
  `
})
