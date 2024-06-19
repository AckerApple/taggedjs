import { childTests } from "./childTests"
import { Subject, callbackMaker, html, onInit, letState, tag, state, callback } from "taggedjs"
import { arrayTests } from "./arrayTests"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { mirroring } from "./mirroring.tag"
import { propsDebugMain } from "./PropsDebug.tag"
import { providerDebugBase } from "./providerDebug"
import { counters } from "./countersDebug"
import { tableDebug } from "./tableDebug.component"
import { contentDebug } from "./ContentDebug.component"
import { watchTesting } from "./watchTesting.tag"
import { oneRender } from "./oneRender.tag"
import { renderCountDiv } from "./renderCount.component"
import funInPropsTag from "./funInProps.tag"
import {App as todo} from "./todo/app"
import { runTests } from "./isolatedApp.test"

export enum ViewTypes {
  Todo = 'todo',
  FunInPropsTag = 'funInPropsTag',
  OneRender = 'oneRender',
  WatchTesting = 'watchTesting',
  Mirroring = 'mirroring',
  Content = 'content',
  Arrays = 'arrays',
  Counters = 'counters',
  TableDebug = 'tableDebug',
  Props = 'props',
  Child = 'child',
  TagSwitchDebug = 'tagSwitchDebug',
  ProviderDebug = 'providerDebug'
}
const viewTypes = Object.values(ViewTypes)

const storage = getScopedStorage()

function getScopedStorage(): {
  autoTest: boolean, views: ViewTypes[]
} {
  const string = localStorage.taggedjs || JSON.stringify({autoTest: true, views: []})
  return JSON.parse(string)
}

function saveScopedStorage() {
  localStorage.taggedjs = JSON.stringify(storage)
}

export default tag(() => {
  state('isolated app state')
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let appCounter = letState(0)(x => [appCounter, appCounter=x])
  let testTimeout = letState(null)(x => [testTimeout, testTimeout=x])
  const appCounterSubject = state(() => new Subject(appCounter))
  const callback = callbackMaker()
  /*
  const cb = callback((x: number) => {
    appCounter = x
  })
  */

  function runTesting(manual = true) {
    const waitFor = 2000

    testTimeout = setTimeout(async () => {
      console.debug('🏃 Running tests...')
      const result = await runTests(storage.views)

      if(!manual) {
        return
      }

      if(result) {
        alert('✅ all app tests passed')
        return
      }

      alert('❌ tests failed. See console for more details')

    }, waitFor) as any // cause delay to be separate from renders
  }

  onInit(() => {
    console.info('1️⃣ app init should only run once')    
    
    appCounterSubject.subscribe(
      callback(x => {
        appCounter = x
      })
    )
    
    // appCounterSubject.subscribe(cb)

    if(storage.autoTest) {
      runTesting(false)
    }
  })

  function toggleViewType(type: ViewTypes) {
    if(storage.views.includes(type)) {
      (storage.views = storage.views.filter(x => x !== type))
    } else {
      storage.views.push(type)
      
      if(storage.autoTest) {
        runTesting()
      }  
    }

    saveScopedStorage()    
  }

  function toggleAutoTesting() {
    storage.autoTest = storage.autoTest = !storage.autoTest
    saveScopedStorage()
  }

  ++renderCount

  return html`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <button id="app-counter-subject-button"
        onclick=${() => {
          appCounterSubject.next(appCounter + 1)
        }}
      >🍒 ++app subject</button>  
      <span>
        🍒 <span id="app-counter-display">${appCounter}</span>
      </span>
      <span>
        🍒 <span id="app-counter-subject-display">${/*appCounterSubject*/'masked'}</span>
      </span>
      auto testing <input type="checkbox" ${storage.autoTest ? 'checked': null} onchange=${toggleAutoTesting} />
      <button type="button" onclick=${() => runTesting(true)}>run tests</button>
    </div>

    <div>
      <h3>Sections</h3>
      <!-- checkbox menu -->
      <div style="display:flex;gap:1em;flex-wrap:wrap;margin:1em;">
        ${viewTypes.map(type => html`
          <div>
            <input type="checkbox"
              id=${'view-type-' + type} name=${'view-type-' + type}
              ${storage.views.includes(type) && 'checked'}
              onclick=${() => toggleViewType(type)}
            />
            <label for=${'view-type-' + type}>&nbsp;${type}</label>
          </div>
        `.key(type))}
      </div>
    </div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${storage.views.includes(ViewTypes.OneRender) && html`
          <fieldset style="flex:2 2 20em">
            <legend>oneRender</legend>
            ${oneRender()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Props) && html`
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${propsDebugMain(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.WatchTesting) && html`
          <fieldset style="flex:2 2 20em">
            <legend>watchTesting</legend>
            ${watchTesting()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.TableDebug) && html`
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${tableDebug()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.ProviderDebug) && html`
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${providerDebugBase(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.TagSwitchDebug) && html`
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${tagSwitchDebug(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Mirroring) && html`
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${mirroring()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Arrays) && html`
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${arrayTests()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Counters) && html`
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${counters({appCounterSubject})}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Content) && html`
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${contentDebug()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Child) && html`
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${childTests(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.FunInPropsTag) && html`
          <fieldset style="flex:2 2 20em">
            <legend>funInPropsTag</legend>
            ${funInPropsTag()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Todo) && html`
          <fieldset style="flex:2 2 20em">
            <legend>todo</legend>
            ${todo()}
          </fieldset>
        `}

        ${/*
          <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ template.string }</textarea>
          <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
          */ false
        }
      </div>
      ${renderCountDiv({renderCount, name:'isolatedApp'})}
    </div>
  `
})
