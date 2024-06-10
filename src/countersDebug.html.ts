import { mouseOverTag } from "./mouseover.tag"
import { renderCountDiv } from "./renderCount.component"
import { html, tag, Subject, onInit, letState, callbackMaker, state, ValueSubject, callback, subject } from "taggedjs"

export const counters = tag(({
  appCounterSubject
}: {
  appCounterSubject: Subject<number>
}) => {
  let counter = letState(0)(x => [counter, counter = x])
  let propCounter = letState(0)(x => [propCounter, propCounter = x])
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let initCounter = letState(0)(x => [initCounter, initCounter = x])
  let memory = state(() => ({counter: 0}))
  
  const callbacks = callbackMaker()
  const callbackTestSub = state(() => new Subject(counter))

  const pipedSubject0 = state(() => new ValueSubject('222'))
  const pipedSubject1 = Subject.all([pipedSubject0, callbackTestSub]).pipe(callback(x => counter))
  const pipedSubject2 = subject.all([pipedSubject0, callbackTestSub]).pipe(x => counter)

  onInit(() => {
    ++initCounter
    console.info('countersDebug.ts: 👉 i should only ever run once')

    callbackTestSub.subscribe(
      callbacks(y => counter = y)
    )
  })

  // State as a callback only needed so pipedSubject1 has the latest value
  const increaseCounter = () => {
    ++counter
    pipedSubject0.next('333-' + counter)
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
        <div>👉 Subscriptions:${(Subject as any).globalSubCount$}</div>
        <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
        <div>initCounter:${initCounter}</div>
    
        <div>
          <button id="app-counter-subject-button"
            onclick=${() => appCounterSubject.next((appCounterSubject.value || 0) + 1)}
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

        <input id="set-main-counter-input"
          onkeyup=${e => (counter = Number(e.target.value) || 0)}
        />

        <div>
          <button id="❤️-increase-counter"
            onclick=${increasePropCounter}
          >❤️ propCounter:${propCounter}</button>
          <span>
            ❤️ <span id="❤️-counter-display">${propCounter}</span>
            </span>
        </div>

        <div>
          <button id="🥦-subject-increase-counter"
            onclick=${() => callbackTestSub.next(counter + 1)}
          >subject increase:</button>
          <span>
            🥦 <span id="🥦-subject-counter-display">${counter}</span>
            🥦 <span id="subject-counter-subject-display">${callbackTestSub}</span>
          </span>
        </div>
      `}
    </div>

    <fieldset>
      <legend>🪈 pipedSubject 1</legend>
      <div>
        <small>
          <span id="🪈-pipedSubject">${pipedSubject1}</span>
        </small>
      </div>
    </fieldset>

    <fieldset>
      <legend>🪈 pipedSubject 2</legend>
      <div>
        <small>
          <span id="🪈-pipedSubject-2">${pipedSubject2}</span>
        </small>
      </div>
    </fieldset>

    ${sharedMemory && html`
      <fieldset>
        <legend>shared memory</legend>
        <div class.bold.text-blue=${true} style="display:flex;flex-wrap:wrap;gap:.5em">
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
    ${renderCountDiv({renderCount, name: 'inner_counters'})}
  `
})
