import { attributeDebug } from "./attributeDebug.component.js"
import { contentDebug } from "./ContentDebug.component.js"
import { tableDebug } from "./tableDebug.component.js"
import { html, tag, setLet, onInit } from "taggedjs"
import { tagDebug } from "./tagJsDebug.js"
import { tagSwitchDebug } from "./tagSwitchDebug.component.js"
import { childTests } from "./childTests.js"
import { runTests } from "./tests.js"
import { renderCountDiv } from "./renderCount.component.js"

export const App = tag(() => {
  console.log('render app.js')
  let _firstState: string = setLet('app first state')(x => [_firstState, _firstState=x])
  let toggleValue: boolean = setLet(false)(x => [toggleValue, toggleValue=x])
  let renderCount: number = setLet(0)(x => [renderCount, renderCount=x])

  const toggle = () => {
    toggleValue = !toggleValue
    console.log('toggled to',toggleValue)
  }

  function runTesting(manual = true) {
    setTimeout(() => {
      const result = runTests()

      if(result && manual) {
        alert('✅ all tests passed')
      }
    }, 3000) // cause delay to be separate from renders
  }

  ++renderCount

  onInit(() => {
    runTesting(false)
  })

  const content = html`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${2+2}</h1>

    <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
    <button onclick=${runTesting}>run test</button>

    ${renderCountDiv({name:'app', renderCount},)}

    <div id="tagDebug-fx-wrap">
      ${tagDebug()}

      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${childTests()}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${attributeDebug()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${contentDebug()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${tagSwitchDebug()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${tableDebug()}
        </fieldset>
      </div>            
    </div>
  `

  console.log('app.component content done')

  return content
})
