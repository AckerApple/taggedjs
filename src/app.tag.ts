import { html, tag, letState, onInit, state, Subject, callbackMaker, onDestroy, states } from "taggedjs"
import { renderedSections } from "./renderedSections.tag"
import { renderCountDiv } from "./renderCount.component"
import { sections } from "./sections.tag"
import { tagDebug } from "./tagJsDebug"
import { runTests } from "./tests"
import { menu, useMenuName } from "./menu.tag"
import { innerCounterContent } from "./countersDebug";

const appDate = Date.now()

const appFun = () => (
  _firstState = letState('app first state')(x => [_firstState, _firstState=x]),
  menuName = useMenuName(),
) => {
  console.log('🍒 App rendered', appDate)

  const content = html`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${2+2}</h1>

    ${menu()}

    ${menuName === 'home' && homePage()}
    ${menuName === 'counters' && innerCounterContent()}
  `

  return content
}

appFun.isApp = true

export const App = tag(appFun)

export const homePage = () => tag.use = (
  // appCounter = 0,
  appCounter = letState(0)(x => [appCounter, appCounter=x]),
  toggleValue = letState(false)(x => [toggleValue, toggleValue=x]),
  testTimeout = letState(null)(x => [testTimeout, testTimeout=x]),
  appCounterSubject = state(() => new Subject<number>(appCounter)),
  renderCount = letState(0)(x => [renderCount, renderCount=x]),
  toggle = () => toggleValue = !toggleValue,
) => {
  // states(get => ({ appCounter } = get({ appCounter })))

  const callbacks = callbackMaker()
  let testEmoji = letState('🟦')(x => [testEmoji, testEmoji = x])
  const onTestComplete = callbacks(success => testEmoji = success ? '✅' : '❌')

  // if I am destroyed before my test runs, prevent test from running
  onDestroy(() => {
    clearTimeout(testTimeout as any)
    testTimeout = null
  })

  onInit(() => {
    console.info('1️⃣ app init should only run once')
    
    fireTesting(false, onTestComplete)

    appCounterSubject.subscribe(
      callbacks(y => {
        appCounter = y
      })
    )
  })

  function fireTesting(
    manual = true,
    onComplete: (success: boolean) => any = () => undefined,
  ) {
    testEmoji = '🟦'
    const waitFor = 2000
    testTimeout = setTimeout(async () => {
      console.debug('🏃 Running tests...')
      const result = await runTests()

      onComplete(result)

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

  ++renderCount

  return html`
    <button onclick=${() => fireTesting(true, onTestComplete)}>run tests ${testEmoji}</button>

    <fieldset>
        <legend>direct app tests</legend>        
        <button id="app-counter-subject-button"
          onclick=${() => appCounterSubject.next(appCounter + 1)}
        >🍒 ++app subject</button>
        <button id="app-counter-button" onclick=${() => ++appCounter}>🍒 ++app</button>
        <span>
          🍒 <span id="app-counter-display">${appCounter}</span>
        </span>
        <span>
          🍒$&lt;<span id="app-counter-subject-display">${appCounterSubject}</span>&gt;
        </span>
        <span>
          🍒$.value&lt;<span id="app-counter-subject-value-display">${appCounterSubject.value}</span>&gt;
        </span>
        <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
      </fieldset>  

    ${renderCountDiv({name:'app', renderCount})}

    ${sections()}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${renderedSections(appCounterSubject)}
      </div>

      ${tagDebug()}
    </div>
  `
}
