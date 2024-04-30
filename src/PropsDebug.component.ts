import { watch, letState, html, tag, InputElementTargetEvent, setProp } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const propsDebugMain = tag((_='propsDebugMain') => {
  let propNumber: any = letState(0)(x => [propNumber, propNumber = x])
  let renderCount: number = letState(0)(x => [renderCount, renderCount = x])
  let propsJson: any = letState({test:33, x:'y'})(x => [propsJson, propsJson = x])
  let date = letState(() => new Date())(x => [date, date = x])

  function propsJsonChanged(event: InputElementTargetEvent) {
    propsJson = JSON.parse(event.target.value)
    return propsJson
  }

  const elmChangeDate = (event: InputElementTargetEvent) => {
    const newDateString = event.target.value
    date = new Date(newDateString)
  }

  ++renderCount

  const json = JSON.stringify(propsJson, null, 2)

  return html`
    <textarea id="props-debug-textarea" wrap="off"
      onchange=${propsJsonChanged}
      style="height:200px;font-size:0.6em;width:100%"
    >${ json }</textarea>
    
    <pre>${ json }</pre>
    <div><small>(renderCount:${renderCount})</small></div>
    
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
      <legend>date prop</legend>
      date:${date}
      <input type="date" value=${timestampToValues(date).date} onchange=${elmChangeDate} />
      <hr />
      ${propDateDebug({date})}
    </fieldset>
    ${/*renderCountDiv({renderCount, name:'propsDebugMain'})*/false}
  `
})

const propDateDebug = tag(({date}: {date: Date}) => {
  return html`
    date:${date}
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
) => {
  let renderCount: number = letState(0)(x => [renderCount, renderCount=x])
  let propNumberChangeCount = letState(0)(x => [propNumberChangeCount, propNumberChangeCount=x])
  const test = (x: number): [number, number] => {
    return [propNumber, propNumber = x]
  }
  propNumber = setProp(test)

  const watchResults = watch([propNumber], () => {
    ++propNumberChangeCount
  })

  ++renderCount

  function pasteProps(event: InputElementTargetEvent) {
    const value = JSON.parse(event.target.value)
    Object.assign(propsJson, value)
  }

  return html`<!--propsDebug.js-->
    <h3>Props Json</h3>
    <textarea style="font-size:0.6em;height:200px;width:100%" wrap="off" onchange=${pasteProps}>${ JSON.stringify(propsJson, null, 2) }</textarea>
    <pre>${ JSON.stringify(propsJson, null, 2) }</pre>
    <hr />
    <h3>Props Number</h3>
    
    <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled
    >${ JSON.stringify(watchResults, null, 2) }</textarea>
    
    <div>
      <button id="propsDebug-🥩-1-button" onclick=${() => propNumberChange(++propNumber)}
      >🐄 🥩 propNumber ${propNumber}</button>
      <span id="propsDebug-🥩-1-display">${propNumber}</span>
    </div>
    <button
      title="test of increasing render count and nothing else"
      onclick=${() => ++renderCount}
    >renderCount ${renderCount}</button>
    
    <button onclick=${() => ++propNumber}
      title="only changes number locally but if change by parent than that is the number"
    >🐄 🥩 local set propNumber ${propNumber}</button>
    
    <div>
      <small>
        (propNumberChangeCount:<span id="propsDebug-🥩-change-display">${propNumberChangeCount}</span>)
      </small>
    </div>
    
    <hr />
    <h3>Fn update test</h3>
    ${propFnUpdateTest({
      propNumber,
      callback: () => ++propNumber
    })}
    
    ${/*renderCountDiv({renderCount, name: 'propsDebug'})*/false}
  `
})

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
