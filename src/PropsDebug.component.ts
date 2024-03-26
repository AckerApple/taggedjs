import { watch, setLet, html, tag, InputElementTargetEvent, setProp } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const propsDebugMain = tag((_='propsDebugMain') => {
  let renderCount: number = setLet(0)(x => [renderCount, renderCount = x])
  let propsJson: any = setLet({test:33, x:'y'})(x => [propsJson, propsJson = x])
  let propNumber: any = setLet(0)(x => [propNumber, propNumber = x])

  function propsJsonChanged(event: InputElementTargetEvent) {
    propsJson = JSON.parse(event.target.value)
    return propsJson
  }

  ++renderCount

  const json = JSON.stringify(propsJson, null, 2)

  console.log('👑 highest prop', propNumber)

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
          console.log('👑 highest prop changed', propNumber)
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
  console.log('parent received arg propNumber', propNumber)
  const inProp = propNumber
  const test = (x: number): [number, number] => {
    // console.log('setProp currently', propNumber)
    return [propNumber, propNumber = x]
  }
  propNumber = setProp(test)

  if(inProp != propNumber) {
    console.log('using new prop number', propNumber)
  } else {
    console.log('prop state and prop are the same', propNumber)
  }

  const watchResults = watch([propNumber], () => {
    ++propNumberChangeCount
    console.log('⌚️ prop change watch detected', propNumber, propNumberChangeCount)
  })

  ++renderCount

  console.log('parent propNumber', {
    propNumber,
    propNumberChangeCount,
    watchResults,
  })

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
    
    <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled>${ JSON.stringify(watchResults, null, 2) }</textarea>
    
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
    
    <div><small>(propNumberChangeCount:${propNumberChangeCount})</small></div>
    
    <hr />
    <h3>Fn update test</h3>
    ${propFnUpdateTest({propNumber, callback: () => {
      ++propNumber
      console.log('new propNumber', propNumber)
      console.log('new propNumber test ---', test(propNumber))
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
  console.log('put down propNumber', propNumber)
  return html`
    <button
      title="the count here and within parent increases but not in parent parent"
      onclick=${callback}
    >🥩 local & 1-parent increase ${propNumber}</button>
    ${/*renderCountDiv({renderCount, name: 'propFnUpdateTest'})*/false}
  `
})
