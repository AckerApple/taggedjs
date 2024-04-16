import { attributeDebug } from "./attributeDebug.component"
import { contentDebug } from "./ContentDebug.component"
import { tableDebug } from "./tableDebug.component"
import { html, tag, letState, onInit, state, Subject, callbackMaker } from "taggedjs"
import { tagDebug } from "./tagJsDebug"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { childTests } from "./childTests"
import { runTests } from "./tests"
import { renderCountDiv } from "./renderCount.component"
import { counters } from "./countersDebug"
import { providerDebugBase } from "./providerDebug"

export const App = tag(() => {
  let _firstState = letState('app first state')(x => [_firstState, _firstState=x])
  let toggleValue = letState(false)(x => [toggleValue, toggleValue=x])
  let appCounter = letState(0)(x => [appCounter, appCounter=x])
  let renderCount = letState(0)(x => [renderCount, renderCount=x])

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

  const callbacks = callbackMaker()
  const appCounterSubject = state(() => new Subject<number>(appCounter))

  onInit(() => {
    console.log('app init should only run once')
    
    runTesting(false)

    appCounterSubject.subscribe(x => {
      callbacks((y) => {
        console.log('callback increase counter', {appCounter, x})
        appCounter = x as number
      })()
    })
  })

  const content = html`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${2+2}</h1>

    <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
    <button onclick=${runTesting}>run test</button>

    <div>
      <button id="app-counter-subject-button"
        onclick=${() => appCounterSubject.set(appCounter + 1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-button">${appCounter}</span>
      </span>
    </div>

    ${renderCountDiv({name:'app', renderCount},)}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${counters({appCounterSubject})}
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

      ${tagDebug()}
    </div>
  `

  return content
})
