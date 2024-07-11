import { mouseOverTag } from "./mouseover.tag.js"
import { renderCountDiv } from "./renderCount.component.js"
import { html, tag, Subject, onInit, letState, callbackMaker, state, ValueSubject, callback, subject } from "taggedjs"

const loadStartTime = Date.now()

export const counters = tag(({
  appCounterSubject
}: {
  appCounterSubject: Subject<number>
}) => (
  readStartTime = state(() => Date.now()),
) => {
  state('countersDebug state')
  let counter = letState(0)(x => [counter, counter = x])
  let propCounter = letState(0)(x => [propCounter, propCounter = x])
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let initCounter = letState(0)(x => [initCounter, initCounter = x])
  let memory = state(() => ({counter: 0}))
  
  const callbacks = callbackMaker()
  const callbackTestSub = state(() => new Subject(counter))

  const pipedSubject0 = state(() => new ValueSubject('222'))
  const pipedSubject1 = Subject.all([pipedSubject0, callbackTestSub]).pipe(callback(x => {
    return counter
  }))
  const pipedSubject2 = subject.all([pipedSubject0, callbackTestSub]).pipe(x => counter)

  onInit(() => {
    ++initCounter
    console.info('countersDebug.ts: 👉 i should only ever run once')

    callbackTestSub.subscribe(
      callbacks(y => {
        counter = y
      })
    )
  })

  // State as a callback only needed so pipedSubject1 has the latest value
  const increaseCounter = () => {
    ++counter
    pipedSubject0.next('333-' + counter)
  }

  const increasePropCounter = () => {
    ++propCounter
  }

  ++renderCount // for debugging

  const sharedMemory = true
  const testInnerCounters = true
  const displayRenderCounters = true
  const testBasics = true

  return html`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${testBasics && html`
        <div>👉 Subscriptions:<span id="👉-counter-sub-count">${(Subject as any).globalSubCount$}</span></div>
        <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
        <div>initCounter:${initCounter}</div>
    
        <div>
          <button id="counters-app-counter-subject-button"
            onclick=${() => appCounterSubject.next((appCounterSubject.value || 0) + 1)}
          >🍒 ++app subject</button>
          <span>
            🍒 <span id="app-counters-display">${appCounterSubject.value}</span>
          </span>
          <span>
            🍒 <span id="app-counters-subject-display">${appCounterSubject.value}</span>
          </span>
        </div>

        <input id="set-main-counter-input" placeholder="input counter value"
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
          <button id="🥦-standalone-counter"
            onclick=${increaseCounter}
          >🥦 stand alone counters</button>
          <span>
            🥦 <span id="🥦-standalone-display">${counter}</span>
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
          <button id="🥦-subject-increase-counter"
            onclick=${() => callbackTestSub.next(counter + 1)}
          >++subject&lt;&gt;</button>
          <span>
            🥦&lt;<span id="subject-counter-subject-display">${callbackTestSub}</span>&gt;
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
    <div style="font-size:0.8em;opacity:0.8">
      ⌚️ page load to display in&nbsp;<span oninit=${event => event.target.innerText = (Date.now()-loadStartTime).toString()}>-</span>ms
    </div>
    <div style="font-size:0.8em;opacity:0.8">
      ⌚️ read in&nbsp;<span oninit=${event => event.target.innerText = (Date.now()-readStartTime).toString()}>-</span>ms
    </div>
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
