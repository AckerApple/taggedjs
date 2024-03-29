import { watch, setLet, html, tag, InputElementTargetEvent, setProp } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const propsDebugMain = tag((_='propsDebugMain') => {
  let propNumber: any = setLet(0)(x => [propNumber, propNumber = x])
  let renderCount: number = setLet(0)(x => [renderCount, renderCount = x])
  let propsJson: any = setLet({test:33, x:'y'})(x => [propsJson, propsJson = x])

  function propsJsonChanged(event: InputElementTargetEvent) {
    propsJson = JSON.parse(event.target.value)
    return propsJson
  }

  ++renderCount

  const json = JSON.stringify(propsJson, null, 2)

  console.log('highest propNumber', propNumber)

  return html`
    <textarea id="props-debug-textarea" wrap="off" onchange=${propsJsonChanged}
      style="height:200px;font-size:0.6em;width:100%"
      oninit=${() => console.log('text area init')}
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
          console.log('highest received new value', x)
        }
      })}
    </fieldset>
    ${/*renderCountDiv({renderCount, name:'propsDebugMain'})*/false}
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
  let renderCount: number = setLet(0)(x => [renderCount, renderCount=x])
  let propNumberChangeCount = setLet(0)(x => [propNumberChangeCount, propNumberChangeCount=x])
  const inProp = propNumber
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

  console.log('parent prop number', propNumber)

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
      >🥩 propNumber ${propNumber}</button>
      <span id="propsDebug-🥩-1-display">${propNumber}</span>
    </div>
    <button
      title="test of increasing render count and nothing else"
      onclick=${() => ++renderCount}
    >renderCount ${renderCount}</button>
    
    <button onclick=${() => ++propNumber}
      title="only changes number locally but if change by parent than that is the number"
    >local set propNumber ${propNumber}</button>
    
    <div><small>(propNumberChangeCount:<span id="propsDebug-🥩-change-display">${propNumberChangeCount}</span>)</small></div>
    
    <hr />
    <h3>Fn update test</h3>
    ${propFnUpdateTest({propNumber, callback: () => {
      ++propNumber
      console.log('parent increase number', propNumber)
    }})}
    
    ${/*renderCountDiv({renderCount, name: 'propsDebug'})*/false}
  `
})

const propFnUpdateTest = tag(({
  propNumber, callback,
}: {
  propNumber: number, callback: Function
}) => {
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])
  ++renderCount

  console.log('propFnUpdateTest - propNumber',propNumber)

  return html`
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${callback}
    >🥩 local & 1-parent increase ${propNumber}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${propNumber}</span>
    ${renderCountDiv({renderCount, name: 'propFnUpdateTest'})}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `
})
