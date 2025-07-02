import { mouseOverTag } from "./mouseover.tag.js";
import { renderCountDiv } from "./renderCount.component.js";
import { states, html, tag, Subject, onInit, callbackMaker, state, ValueSubject, callback, subject, subscribe, host } from "taggedjs";
const loadStartTime = Date.now();
export const counters = tag.immutableProps(({ appCounterSubject }, _ = 'countersDebug') => {
    state('countersDebug state');
    return html `<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <div>👉 Subscription count:<span id="👉-counter-sub-count">
        ${subscribe(Subject.globalSubCount$)}</span>
      </div>
      <button
        onclick=${() => console.info('subs', Subject.globalSubs)}
      >log subs</button>
  
      <div>
        <button id="counters-app-counter-subject-button"
          onclick=${() => appCounterSubject.next((appCounterSubject.value || 0) + 1)}
        >🍒 ++app subject</button>
        <span>
          🍒 <span id="app-counters-display">${subscribe(appCounterSubject)}</span>
        </span>
        <span>
          🍒 <span id="app-counters-subject-display">${appCounterSubject.value}</span>
        </span>
      </div>
    </div>
    
    ${innerCounterContent()}
  `;
});
const innerCounters = tag.deepPropWatch(({ propCounter, increasePropCounter, }) => (otherCounter = 0, renderCount = 0, elmInitCount = 0, _ = states(get => [{ elmInitCount, otherCounter, renderCount }] = get({ elmInitCount, otherCounter, renderCount })), __ = ++renderCount) => html `
  <div style="display:flex;flex-wrap:wrap;gap:1em;" ${host.onInit(() => ++elmInitCount)}>
    <div style="border:1px dashed black;padding:1em;">
      🔥 elmInitCount:<span id="🔥-init-counter">${elmInitCount}</span>
    </div>

    <div style="border:1px dashed black;padding:1em;">
      <button id="❤️-inner-counter" onclick=${increasePropCounter}
      >❤️-inner-counter propCounter:${propCounter}</button>
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
  ${renderCountDiv({ renderCount, name: 'inner_counters' })}
`);
const shallowPropCounters = tag.watchProps(({ propCounter, increasePropCounter, }) => {
    let otherCounter = 0;
    let renderCount = 0;
    states(get => [{ otherCounter, renderCount }] = get({ otherCounter, renderCount }));
    ++renderCount; // for debugging
    return html `
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
    ${renderCountDiv({ renderCount, name: 'shallow_counters' })}
  `;
});
const immutablePropCounters = tag.immutableProps(({ propCounter, increasePropCounter, }) => {
    let otherCounter = 0;
    let renderCount = 0;
    states(get => [{ otherCounter, renderCount }] = get({ otherCounter, renderCount }));
    ++renderCount; // for debugging
    return html `
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
    ${renderCountDiv({ renderCount, name: 'immutable_counters' })}
  `;
});
const noWatchPropCounters = ({ propCounter, increasePropCounter, }) => {
    let otherCounter = 0;
    let renderCount = 0;
    let noWatchPropCounters = 'noWatchPropCounters'; // just a name to pickup
    states(get => [{ otherCounter, renderCount, noWatchPropCounters }] = get({ otherCounter, renderCount, noWatchPropCounters }));
    ++renderCount; // for debugging
    return html `
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
    ${renderCountDiv({ renderCount, name: 'nowatch_counters' })}
  `;
};
export const innerCounterContent = () => tag.use = (statesRenderCount = 0, statesRenderCount2 = 0, counter = 0, counter2 = 0, renderCount = 0, propCounter = 0, initCounter = 0, callbacks = callbackMaker(), callbackTo = callback(z => {
    counter2 = z;
}), increasePropCounter = () => {
    ++propCounter;
}, immutableProps = state(() => ({ propCounter, increasePropCounter })), _ = states(get => [{
        counter, renderCount, propCounter, initCounter, immutableProps,
        statesRenderCount, statesRenderCount2,
    }] = get({
    counter, renderCount, propCounter, initCounter, immutableProps,
    statesRenderCount, statesRenderCount2,
})), callbackTestSub = state(() => new Subject(counter)), callbackTestSub2 = state(() => new Subject(0)), pipedSubject0 = state(() => new ValueSubject('222')), 
// State as a callback only needed so pipedSubject1 has the latest value
increaseCounter = () => {
    ++counter;
    pipedSubject0.next('333-' + counter);
}, pipedSubject1 = Subject.all([pipedSubject0, callbackTestSub]), pipedSubject2 = subject.all([pipedSubject0, callbackTestSub]), memory = state(() => ({ counter: 0 })), 
// create an object that remains the same
readStartTime = state(() => Date.now()), __ = onInit(() => {
    ++initCounter;
    console.info('countersDebug.ts: 👉 i should only ever run once');
    callbackTestSub.subscribe(callbacks(y => {
        counter = y;
    }));
    callbackTestSub.subscribe(callbackTo);
})) => {
    if (immutableProps.propCounter !== propCounter) {
        immutableProps = { propCounter, increasePropCounter };
    }
    ++renderCount; // for debugging
    return html `
  <div>initCounter:${initCounter}</div>
  
  <div>
    😱 statesRenderCount:${statesRenderCount}
    <button type="button" onclick=${() => {
        ++statesRenderCount;
    }}>😱 ++statesRenderCount</button>
  </div>

  <div>
    😱😱 statesRenderCount2:${statesRenderCount2}
    <button type="button" onclick=${() => {
        ++statesRenderCount2;
    }}>😱😱 ++statesRenderCount2</button>
  </div>

  <div style="display:flex;flex-wrap:wrap;gap:1em">
    <input id="set-main-counter-input" placeholder="input counter value"
      onkeyup=${(e) => (counter = Number(e.target.value) || 0)}
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
  
    ${counter > 1 && html `
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
        🥦&lt;<span id="subject-counter-subject-display">${subscribe(callbackTestSub)}</span>&gt;
      </span>
    </div>

    <div>
      <button id="🥦-subject-increase-async-counter"
        onclick=${() => {
        setTimeout(() => {
            callbackTestSub2.next(callbackTestSub2.value + 1);
        }, 10);
    }}
      >🔀 🥦 ++subject&lt;&gt;</button>
      <span>
        🔀 🥦&lt;<span id="subject-async-counter-subject-display">${subscribe(callbackTestSub2)}</span>&gt;
      </span>
    </div>
  </div>

  <fieldset>
    <legend>🪈 pipedSubject 1</legend>
    <div>
      <small>
        <span id="🪈-pipedSubject">${subscribe(pipedSubject1, () => counter)}</span>
      </small>
    </div>
  </fieldset>

  <fieldset>
    <legend>🪈 pipedSubject 2</legend>
    <div>
      <small>
        <span id="🪈-pipedSubject-2">${subscribe(pipedSubject2, () => counter)}</span>
      </small>
    </div>
  </fieldset>

  <fieldset>
    <legend>shared memory</legend>
    <div class.bold.text-blue=${true} style="display:flex;flex-wrap:wrap;gap:.5em">
      ${mouseOverTag({ label: 'a-a-😻', memory })}
      ${mouseOverTag({ label: 'b-b-😻', memory })}
    </div>
    memory.counter:😻${memory.counter}
    <button onclick=${() => ++memory.counter}>increase 😻</button>
  </fieldset>
  
  <fieldset>
    <legend>inner counter</legend>
    ${innerCounters({ propCounter, increasePropCounter })}
  </fieldset>

  <fieldset>
    <legend>shallow props</legend>
    ${shallowPropCounters({ propCounter, increasePropCounter })}
  </fieldset>

  <fieldset>
    <legend>immutable props</legend>
    ${immutablePropCounters(immutableProps)}
  </fieldset>

  <fieldset>
    <legend>nowatch props</legend>
    ${noWatchPropCounters({ propCounter, increasePropCounter })}
  </fieldset>

  <div style="font-size:0.8em;opacity:0.8">
    ⌚️ page load to display in&nbsp;<span ${host.onInit((element) => element.innerText = (Date.now() - loadStartTime).toString())}>-</span>ms
  </div>
  <div style="font-size:0.8em;opacity:0.8">
    ⌚️ read in&nbsp;<span ${host.onInit((element) => element.innerText = (Date.now() - readStartTime).toString())}>-</span>ms
  </div>

  ${renderCountDiv({ renderCount, name: 'counters' })}
`;
};
//# sourceMappingURL=countersDebug.js.map