import { childTests } from "./childTests"
import { Subject, callbackMaker, html, onInit, letState, tag, state } from "taggedjs"
import { arrayTests } from "./arrayTests"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { propsDebugMain } from "./PropsDebug.component"
import { providerDebugBase } from "./providerDebug"
import { counters } from "./countersDebug"
import { tableDebug } from "./tableDebug.component"
import { contentDebug } from "./ContentDebug.component"

type viewTypes = 'content' | 'arrays' | 'counters' | 'tableDebug' | 'props' | 'child' | 'tagSwitchDebug' | 'providerDebug'
export const IsolatedApp = tag(() => {
  const views: viewTypes[] = [
    // 'content',
    // 'counters',

    'props',
    // 'providerDebug',
    
    // 'arrays',
    // 'tagSwitchDebug',
    
    // 'child',
  ]
  
  let appCounter = letState(0)(x => [appCounter, appCounter=x])
  const appCounterSubject = state(() => new Subject(appCounter))
  const callback = callbackMaker()
  onInit(() => {
    console.log('app init should only run once')    

    appCounterSubject.subscribe(
      callback(x => {
        console.log('callback increase counter', {appCounter, x})
        appCounter = x
      })
    )
  })

  return html`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${views.includes('props') && html`
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${propsDebugMain(undefined)}
          </fieldset>
        `}

        ${views.includes('tableDebug') && html`
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${tableDebug()}
          </fieldset>
        `}

        ${views.includes('providerDebug') && html`
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${providerDebugBase(undefined)}
          </fieldset>
        `}

        ${views.includes('tagSwitchDebug') && html`
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${tagSwitchDebug(undefined)}
          </fieldset>
        `}

        ${views.includes('arrays') && html`
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${arrayTests()}
          </fieldset>
        `}

        ${views.includes('counters') && html`
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${counters({appCounterSubject})}
          </fieldset>
        `}

        ${views.includes('content') && html`
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${contentDebug()}
          </fieldset>
        `}

        ${views.includes('child') && html`
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${childTests(undefined)}
          </fieldset>
        `}

        ${/*
          <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ template.string }</textarea>
          <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
          */ false
        }
      </div>
    </div>
  `
})
