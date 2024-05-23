import { watch, letState, html, tag, InputElementTargetEvent, onInit, letProp } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"
import { watchTesting } from "./watchTesting.tag"

export const propsDebugMain = tag((_='propsDebugMain') => (
  propNumber = letState(0)(x => [propNumber, propNumber = x]),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  propsJson = letState({test:33, x:'y'})(x => [propsJson, propsJson = x]),
  date = letState(() => new Date())(x => [date, date = x]),
  syncPropNumber = letState(0)(x => [syncPropNumber, syncPropNumber = x]),
  json = JSON.stringify(propsJson, null, 2),
) => html`
  <textarea id="props-debug-textarea" wrap="off"
    onchange=${event => propsJson = JSON.parse(event.target.value)}
    style="height:200px;font-size:0.6em;width:100%"
  >${ json }</textarea>
  
  <pre>${ json }</pre>
  <div><small>(renderCount:${++renderCount})</small></div>
  
  <div>
    <button id="propsDebug-🥩-0-button"
      onclick=${() => ++propNumber}
    >🥩 propNumber ${propNumber}</button>
    <span id="propsDebug-🥩-0-display">${propNumber}</span>
  </div>
  
  <fieldset>
    <legend>child</legend>
    ${propsDebug({
      propNumber,
      propsJson,
      propNumberChange: x => {
        propNumber = x
      }
    })}
  </fieldset>

  <fieldset>
    <legend>sync props callback</legend>
    🥡 syncPropNumber: <span id="sync-prop-number-display">${syncPropNumber}</span>
    <button onclick=${() => ++syncPropNumber}>🥡 ++</button>
    <hr />
    ${syncPropDebug({
      syncPropNumber,
      propNumberChange: x => {
        syncPropNumber = x
      },
      nothingTest: x => x
    })}
  </fieldset>

  <fieldset>
    <legend>date prop</legend>
    date:${date}
    <input type="date" value=${timestampToValues(date).date} onchange=${event => {
      const newDateString = event.target.value
      date = new Date(newDateString)
    }} />
    <hr />
    ${propDateDebug({date})}
  </fieldset>
`)

const propDateDebug = tag(({date}: {date: Date}) => html`date:${date}`)

/** Tests calling a property that is a function immediately which should cause rendering */
const syncPropDebug = tag((
  {
    syncPropNumber,
    propNumberChange,
    nothingTest,
  }: {
    syncPropNumber: number
    propNumberChange: (x: number) => any
    nothingTest: <T>(x: T) => T
  }
) => {
  let counter = letState(0)(x => [counter, counter = x])

  if(syncPropNumber % 2 === 1) {
    propNumberChange(syncPropNumber = syncPropNumber + 1)
  }
  
  return html`<!--syncPropDebug-->
    <div>
      🥡 syncPropNumber:<span id="sync-prop-child-display">${syncPropNumber}</span>
      <button id="sync-prop-child-button" onclick=${() => propNumberChange(++syncPropNumber)}>🥡 ++</button>
    </div>
    <div>
      <div>
        counter:<span id="sync-prop-counter-display">${counter}</span>
      </div>
      nothingTest<span id="nothing-prop-counter-display">${nothingTest(counter)}</span>
      <button id="nothing-prop-counter-button" onclick=${() => nothingTest(++counter)}>++</button>
    </div>
  `
})

const propsDebug = tag((
  {
    propNumber,
    propsJson,
    propNumberChange,
  }: {
    propNumber: number,
    propNumberChange: (x: number) => unknown,
    propsJson: any
  }
) => (
  renderCount = letState(0)(x => [renderCount, renderCount=x]),
  propNumberChangeCount = letState(0)(x => [propNumberChangeCount, propNumberChangeCount=x]),

  // poor way to update an argument
  myPropNumber = letState(propNumber)(x => [myPropNumber, myPropNumber=x]),
  _ = watch([propNumber], () => myPropNumber = propNumber),
  watchResults = watch([myPropNumber], () => ++propNumberChangeCount),

  // simple way to locally only update an argument
  __ = letProp(propNumber)(x => [propNumber, propNumber = x]),
) => html`<!--propsDebug.js-->
  <h3>Props Json</h3>
  <textarea style="font-size:0.6em;height:200px;width:100%" wrap="off"
    onchange=${event=> {
      const value = JSON.parse(event.target.value)
      Object.assign(propsJson, value)
    }}
  >${ JSON.stringify(propsJson, null, 2) }</textarea>
  <pre>${ JSON.stringify(propsJson, null, 2) }</pre>
  <hr />
  
  <h3>Props Number</h3>
  <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled
  >${ JSON.stringify(watchResults, null, 2) }</textarea>
  
  <div>
    <button id="propsDebug-🥩-1-button" onclick=${() => propNumberChange(++myPropNumber)}
    >🐄 🥩 propNumber ${myPropNumber}</button>
    <span id="propsDebug-🥩-1-display">${myPropNumber}</span>
  </div>

  <div>
    <button id="propsDebug-🥩-2-button" onclick=${() => ++propNumber}
    >🐄 🥩 local set propNumber ${propNumber}</button>
    <span id="propsDebug-🥩-2-display">${propNumber}</span>
  </div>

  <button
    title="test of increasing render count and nothing else"
    onclick=${() => ++renderCount}
  >renderCount ${++renderCount}</button>
  
  <button onclick=${() => ++myPropNumber}
    title="only changes number locally but if change by parent than that is the number"
  >🐄 🥩 local set myPropNumber ${myPropNumber}</button>
  
  <div>
    <small>
      (propNumberChangeCount:<span id="propsDebug-🥩-change-display">${propNumberChangeCount}</span>)
    </small>
  </div>
  
  <hr />

  <h3>Fn update test</h3>
  ${propFnUpdateTest({
    propNumber: myPropNumber,
    callback: () => ++myPropNumber
  })}    
`)

const propFnUpdateTest = tag(({
  propNumber, callback,
}: {
  propNumber: number, callback: Function
}) => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  ++renderCount

  return html`
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${callback}
    >🐄 🥩 local & 1-parent increase ${propNumber}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${propNumber}</span>
    ${renderCountDiv({renderCount, name: 'propFnUpdateTest'})}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `
})

function timestampToValues(
  timestamp: number | Date | string
) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`
  };
}
