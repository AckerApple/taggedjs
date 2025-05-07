import { Subject, callbackMaker, html, onInit, tag, state, states, subscribe } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"
import { activate, sectionSelector, viewChanged, ViewTypes } from "./sectionSelector.tag"
import { renderedSections } from "./renderedSections.tag"
import { autoTestingControls } from "./autoTestingControls.tag"
import { menu } from "./menu.tag"
import { useHashRouter } from "./todo/HashRouter.function"

export default () => tag.use = (
  _ = state('isolated app state'),
  renderCount = 0,
  appCounter = 0,
  appCounterSubject = state(() => new Subject(appCounter)),
  toggleValue = false,

  __ = states(get => [{renderCount,appCounter,toggleValue}] = get({renderCount,appCounter,toggleValue})),

  toggle = () => toggleValue = !toggleValue,
  callback = callbackMaker(),
) => {
  const route = useHashRouter().route.split('/')
    .map(x => x.trim())
    .filter(hasLength => hasLength.length)
    
  let viewTypes: ViewTypes[] | undefined = undefined

  if(route.length) {
    viewTypes = route as ViewTypes[]
  }

  onInit(() => {
    console.info('1️⃣ app init should only run once')    
    
    appCounterSubject.subscribe(
      callback(x => {
        appCounter = x
      }) // a let variable is expected to maintain new value over render cycles forward
    )
  })

  ++renderCount

  return html`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>
    <div style="opacity:.6">(no HMR)</div>
    <div style="opacity:.6">route: ${route}</div>

    ${menu()}

    <div>
      <fieldset>
        <legend>direct app tests</legend>        
        <button id="app-counter-subject-button"
          onclick=${() => {
            appCounterSubject.next(appCounter + 1)
          }}
        >🍒 ++app subject</button>
        <button id="app-counter-button" onclick=${() => {
          ++appCounter
        }}>🍒 ++app</button>
        <span>
          🍒 <span id="app-counter-display">${appCounter}</span>
        </span>
        <span>
          🍒$&lt;<span id="app-counter-subject-display">${subscribe(appCounterSubject)}</span>&gt;
        </span>
        <span>
          🍒$.value&lt;<span id="app-counter-subject-value-display">${appCounterSubject.value}</span>&gt;
        </span>
        <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
      </fieldset>  

      ${autoTestingControls(viewTypes)}
    </div>

    <div style="display:flex;flex-wrap:nowrap;gap:1em;justify-content: center;">
      ${renderCountDiv({name:'app', renderCount})}
      <div>
        <small>(subscription count: ${subscribe(Subject.globalSubCount$)})</small>
      </div>
    </div>

    ${sectionSelector(viewTypes)}

    <div id="tagDebug-fx-wrap">
      ${renderedSections(appCounterSubject, viewTypes)}
      ${renderCountDiv({renderCount, name:'isolatedApp'})}
    </div>
  `
}

viewChanged.subscribe(({type, checkTesting}) => {
  activate(type, checkTesting)
})
