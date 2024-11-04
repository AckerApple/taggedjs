import { mouseOverTag } from "./mouseover.tag.js"
import { renderCountDiv } from "./renderCount.component.js"
import { states, html, tag, Subject, onInit, letState, callbackMaker, state, ValueSubject, callback, subject } from "taggedjs"

const loadStartTime = Date.now()

export const counters = tag.immutableProps(({
  appCounterSubject
}: {
  appCounterSubject: Subject<number>
},
_ = 'countersDebug'
) => {
  state('countersDebug state')

  return html`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <div>👉 Subscriptionszzzzp:<span id="👉-counter-sub-count">${(Subject as any).globalSubCount$}</span></div>
      <button onclick=${() => console.info('subs', (Subject as any).globalSubs)}>log subs</button>
  
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
    </div>
    
    ${innerCounterContent()}
  `
})

const innerCounters = tag.deepPropWatch(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => (
  otherCounter = 0,
  renderCount = 0,
  elmInitCount = 0,
  _ = states(get => ({elmInitCount, otherCounter, renderCount} = get({elmInitCount, otherCounter, renderCount}))),
  __ = ++renderCount, // for debugging
) => html`
  <div style="display:flex;flex-wrap:wrap;gap:1em;" oninit=${() => ++elmInitCount}>
    <div style="border:1px dashed black;padding:1em;">
      🔥 elmInitCount:<span id="🔥-init-counter">${elmInitCount}</span>
    </div>

    <div style="border:1px dashed black;padding:1em;">
      <button id="❤️-inner-counter" onclick=${increasePropCounter}
      >❤️ propCounter:${propCounter}</button>
      <span>
        ❤️ <span id="❤️-inner-display">${propCounter}</span>
      </span>
    </div>

    <div style="border:1px dashed black;padding:1em;">
      <button id="🤿-deep-counter" onclick=${() => ++otherCounter}
      >🤿 otherCounter:${otherCounter}</button>
      <span>
      🤿 <span id="🤿-deep-display">${otherCounter}</span>
      </span>
    </div>
  </div>

  <div>renderCount:${renderCount}</div>
  ${renderCountDiv({renderCount, name: 'inner_counters'})}
`)

const shallowPropCounters = tag.watchProps(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  // let otherCounter = letState(0)(x => [otherCounter, otherCounter = x])
  // let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let otherCounter = 0
  let renderCount = 0
  states(get => ({otherCounter, renderCount} = get({otherCounter, renderCount})))

  ++renderCount // for debugging

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px dashed black;padding:1em;">
        <button id="❤️💧-shallow-counter" onclick=${increasePropCounter}
        >❤️💧 propCounter:${propCounter}</button>
        <span>
          ❤️💧 <span id="❤️💧-shallow-display">${propCounter}</span>
        </span>
      </div>

      <div style="border:1px dashed black;padding:1em;">
        <button id="💧-shallow-counter" onclick=${() => ++otherCounter}
        >💧 otherCounter:${otherCounter}</button>
        <span>
          💧 <span id="💧-shallow-display">${otherCounter}</span>
        </span>
      </div>
    </div>
    
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'shallow_counters'})}
  `
})

const immutablePropCounters = tag.immutableProps(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  // let otherCounter = letState(0)(x => [otherCounter, otherCounter = x])
  // let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let otherCounter = 0
  let renderCount = 0
  states(get => ({otherCounter, renderCount} = get({otherCounter, renderCount})))

  ++renderCount // for debugging

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px dashed black;padding:1em;">
        <button id="❤️🪨-immutable-counter" onclick=${increasePropCounter}
        >❤️🪨 propCounter:${propCounter}</button>
        <span>
          ❤️🪨 <span id="❤️🪨-immutable-display">${propCounter}</span>
        </span>
      </div>

      <div style="border:1px dashed black;padding:1em;">
        <button id="🪨-immutable-counter" onclick=${() => ++otherCounter}
        >🪨 otherCounter:${otherCounter}</button>
        <span>
        🪨 <span id="🪨-immutable-display">${otherCounter}</span>
        </span>
      </div>
    </div>
    
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'immutable_counters'})}
  `
})

const noWatchPropCounters = ({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  // let otherCounter = letState(0)(x => [otherCounter, otherCounter = x])
  // let renderCount = letState(0)(x => [renderCount, renderCount = x])

  let otherCounter = 0
  let renderCount = 0
  states(get => ({otherCounter, renderCount} = get({otherCounter, renderCount})))

  ++renderCount // for debugging

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px dashed black;padding:1em;">
        <button id="❤️🚫-nowatch-counter" onclick=${increasePropCounter}
        >❤️🚫 propCounter:${propCounter}</button>
        <span>
          ❤️🚫 <span id="❤️🚫-nowatch-display">${propCounter}</span>
        </span>
      </div>

      <div style="border:1px dashed black;padding:1em;">
        <button id="🚫-nowatch-counter" onclick=${() => ++otherCounter}
        >🚫 otherCounter:${otherCounter}</button>
        <span>
        🚫 <span id="🚫-nowatch-display">${otherCounter}</span>
        </span>
      </div>
    </div>
    
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'nowatch_counters'})}
  `
}

export const innerCounterContent = () => tag.use = (
  statesRenderCount = 0,
  statesRenderCount2 = 0,
  callbacks = callbackMaker(),
  
  // counter = 0,
  counter = letState(0)(x => [counter, counter = x]),
  
  // renderCount = 0,
  renderCount = letState(0)(x => [renderCount, renderCount = x]),

  // propCounter = 0,
  propCounter = letState(0)(x => [propCounter, propCounter = x]),
  
  // initCounter = 0,
  initCounter = letState(0)(x => [initCounter, initCounter = x]),
  increasePropCounter = () => {
    ++propCounter
  },

  callbackTestSub = state(() => new Subject(counter)),
  pipedSubject0 = state(() => new ValueSubject('222')),

  // State as a callback only needed so pipedSubject1 has the latest value
  increaseCounter = () => {
    ++counter
    pipedSubject0.next('333-' + counter)
  },

  pipedSubject1 = Subject.all([pipedSubject0, callbackTestSub]).pipe(callback(x => {
    return counter
  })),
  pipedSubject2 = subject.all([pipedSubject0, callbackTestSub]).pipe(x => counter),
  memory = state(() => ({counter: 0})),
  // create an object that remains the same
  immutableProps = letState(() => ({propCounter, increasePropCounter}))(x => [immutableProps, immutableProps]),
  readStartTime = state(() => Date.now()),

  __ = onInit(() => {
    ++initCounter
    console.info('countersDebug.ts: 👉 i should only ever run once')

    callbackTestSub.subscribe(
      callbacks(y => {
        counter = y
      })
    )
  }),
) => {
  states(set => ({
    statesRenderCount, statesRenderCount2,
    // renderCount,
    // counter,
    // propCounter,
    // initCounter,
  } = set({
    statesRenderCount, statesRenderCount2,
    // renderCount,
    // counter,
    // propCounter,
    // initCounter,
  })))

  if(immutableProps.propCounter !== propCounter) {
    immutableProps = {propCounter, increasePropCounter}
  }

  ++renderCount // for debugging

  return html`
  <div>initCounter:${initCounter}</div>
  
  <div>
    😱 statesRenderCount:${statesRenderCount}
    <button type="button" onclick=${() => {
      ++statesRenderCount
    }}>😱 ++statesRenderCount</button>
  </div>

  <div>
    😱😱 statesRenderCount2:${statesRenderCount2}
    <button type="button" onclick=${() => {
      ++statesRenderCount2
    }}>😱😱 ++statesRenderCount2</button>
  </div>

  <div style="display:flex;flex-wrap:wrap;gap:1em">
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

  <fieldset>
    <legend>shared memory</legend>
    <div class.bold.text-blue=${true} style="display:flex;flex-wrap:wrap;gap:.5em">
      ${mouseOverTag({label: 'a-a-😻', memory})}
      ${mouseOverTag({label: 'b-b-😻', memory})}
    </div>
    memory.counter:😻${memory.counter}
    <button onclick=${() => ++memory.counter}>increase 😻</button>
  </fieldset>
  
  <fieldset>
    <legend>inner counter</legend>
    ${innerCounters({propCounter, increasePropCounter})}
  </fieldset>

  <fieldset>
    <legend>shallow props</legend>
    ${shallowPropCounters({propCounter, increasePropCounter})}
  </fieldset>

  <fieldset>
    <legend>immutable props</legend>
    ${immutablePropCounters(immutableProps)}
  </fieldset>

  <fieldset>
    <legend>nowatch props</legend>
    ${noWatchPropCounters({propCounter, increasePropCounter})}
  </fieldset>

  <div style="font-size:0.8em;opacity:0.8">
    ⌚️ page load to display in&nbsp;<span oninit=${event => event.target.innerText = (Date.now()-loadStartTime).toString()}>-</span>ms
  </div>
  <div style="font-size:0.8em;opacity:0.8">
    ⌚️ read in&nbsp;<span oninit=${event => event.target.innerText = (Date.now()-readStartTime).toString()}>-</span>ms
  </div>

  ${renderCountDiv({renderCount, name: 'counters'})}
`}
