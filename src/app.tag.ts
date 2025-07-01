import { html, tag, onInit, state, Subject, callbackMaker, onDestroy, states, subscribe } from "taggedjs"
import { renderedSections } from "./renderedSections.tag"
import { renderCountDiv } from "./renderCount.component"
import { sectionSelector } from "./sectionSelector.tag"
import { tagDebug } from "./tagJsDebug"
import { runTests } from "./tests"
import { menu, useMenuName } from "./menu.tag"
import { innerCounterContent } from "./countersDebug";
import { content } from "./ContentDebug.tag"
import { animateWrap } from "taggedjs-animate-css"

const appDate = Date.now()

function appFun(){
  return function runAppFun(menuName = useMenuName()) {
    let showHide = false

    states(get => [{ showHide }] = get({ showHide }))

    console.log('🍒 App rendered', appDate)
    return html`<!--app.js-->
      <h1 id="h1-app">🏷️ TaggedJs - ${2+2}</h1>

      <button type="button" onclick=${() => showHide = !showHide}>show/hide ${showHide}</button>
      ${showHide && fxTag()}


      ${menu()}

      ${menuName === 'home' && homePage()}
      ${menuName === 'counters' && innerCounterContent()}
      ${menuName === 'content' && content()}
    `
  }
}
appFun.isApp = true

export const App = tag(appFun)

export const homePage = () => tag.use = (
  showSections = true,
  appCounter = 0,
  toggleValue = false,
  testTimeout = null,
  appCounterSubject = state(() => new Subject<number>(appCounter)),
  renderCount = 0,
  testEmoji = '🟦',

  _ = states(get => [{
    showSections,
    appCounter,
    toggleValue,
    testTimeout,
    renderCount,
    testEmoji,
  }] = get({
    showSections,
    appCounter,
    toggleValue,
    testTimeout,
    renderCount,
    testEmoji,
  })),

  toggle = () => {
    toggleValue = !toggleValue
  },
) => {
  // states(get => ({ appCounter } = get({ appCounter })))

  const callbacks = callbackMaker()
  const onTestComplete = callbacks(success => testEmoji = success ? '✅' : '❌')

  // if I am destroyed before my test runs, prevent test from running
  onDestroy(function appOnDestroy() {
    clearTimeout(testTimeout as any)
    testTimeout = null
  })

  onInit(function appOnInit() {
    console.info('1️⃣ app init should only run once')
    
    fireTesting(false, onTestComplete)

    appCounterSubject.subscribe(
      callbacks(x => appCounter = x)
    )
  })

  function fireTesting(
    manual = true,
    onComplete: (success: boolean) => any = () => undefined,
  ) {
    testEmoji = '🟦'
    const waitFor = 2000
    testTimeout = setTimeout(async () => {
      console.debug('🏃 🏃‍♀️ 🏃‍♂️ Running tests... 🏃‍♂️‍➡️ 🏃‍♀️‍➡️ 🏃‍➡️x')
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
        onclick=${() => {
          appCounterSubject.next(appCounter + 1)
        }}
      >🍒 ++app subject</button>
      <button id="app-counter-button" onclick=${() => ++appCounter}>🍒 ++app</button>
      <span>
        🍒 <span id="app-counter-display">${appCounter}</span>
      </span>
      <span>
        🍒$&lt;<span id="app-counter-subject-display">${subscribe(appCounterSubject)}</span>&gt;
      </span>
      <span>
        🍒$.value&lt;<span id="app-counter-subject-value-display">${appCounterSubject.value}</span>&gt;
      </span>
      <button id="toggle-test" onclick=${() => toggle()}>toggle test ${toggleValue}</button>
    </fieldset>  

    <div style="display:flex;flex-wrap:nowrap;gap:1em;justify-content: center;">
      ${renderCountDiv({name:'app', renderCount})}
      <div>
        <small>(subscription count: ${subscribe(Subject.globalSubCount$)})</small>
      </div>
    </div>

    <a name="top" id="top"></a>

    ${sectionSelector()}

    <div id="tagDebug-fx-wrap">
      <button onclick=${() => showSections = !showSections}>toggle sections</button>
      ${showSections && renderedSections(appCounterSubject)}

      ${tagDebug()}
    </div>
  `
}

const fxTag = tag(() => html`
  <hr />
  ${animateWrap().innerHTML = html`
    Hello animated world
  `}
  <hr />
`)