import { attributeDebug } from "./attributeDebug.component"
import { contentDebug } from "./ContentDebug.component"
import { tableDebug } from "./tableDebug.component"
import { html, tag, setLet, onInit } from "taggedjs"
import { tagDebug } from "./tagJsDebug"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { childTests } from "./childTests"
import { runTests } from "./tests"
import { renderCountDiv } from "./renderCount.component"
import { counters } from "./countersDebug"
import { providerDebugBase } from "./providerDebug"

export const App = tag(() => {
  console.log('render app.ts')
  let _firstState: string = setLet('app first state')(x => [_firstState, _firstState=x])
  let toggleValue: boolean = setLet(false)(x => [toggleValue, toggleValue=x])
  let renderCount: number = setLet(0)(x => [renderCount, renderCount=x])

  const toggle = () => {
    toggleValue = !toggleValue
  }

  function runTesting(manual = true) {
    const waitFor = 1000
    setTimeout(() => {
      console.debug('🏃 Running tests...')
      const result = runTests()

      if(!manual) {
        return
      }

      if(result) {
        alert('✅ all tests passed')
        return
      }

      alert('❌ tests failed. See console for more details')

    }, waitFor) // cause delay to be separate from renders
  }

  ++renderCount

  onInit(() => runTesting(false))

  const content = html`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${2+2}</h1>

    <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
    <button onclick=${runTesting}>run test</button>

    ${renderCountDiv({name:'app', renderCount},)}

    <div id="tagDebug-fx-wrap">
      ${tagDebug()}

      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${counters()}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${providerDebugBase(undefined)}
        </fieldset>

        ${childTests(undefined)}

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
          ${tagSwitchDebug(undefined)}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${tableDebug()}
        </fieldset>
      </div>            
    </div>
  `

  return content
})
