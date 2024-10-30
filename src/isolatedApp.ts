import { Subject, callbackMaker, html, onInit, letState, tag, state } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"
import { activate, sections, viewChanged } from "./sections.tag"
import { renderedSections } from "./renderedSections.tag"
import { autoTestingControls } from "./autoTestingControls.tag"
import { menu } from "./menu.tag"

export default () => tag.use = (
  _ = state('isolated app state'),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  appCounter = letState(0)(x => [appCounter, appCounter=x]),
  appCounterSubject = state(() => new Subject(appCounter)),
  toggleValue = letState(false)(x => [toggleValue, toggleValue=x]),
  toggle = () => toggleValue = !toggleValue,
  callback = callbackMaker(),
) => {
  onInit(() => {
    console.info('1️⃣ app init should only run once')    
    
    appCounterSubject.subscribe(
      callback(x => appCounter = x) // a let variable is expected to maintain new value over render cycles forward
    )
  })

  ++renderCount

  return html`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>
    <div style="opacity:.6">(no HMR)</div>

    ${menu()}

    <div>
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

      ${autoTestingControls()}
    </div>

    ${renderCountDiv({name:'app', renderCount})}

    ${sections()}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${renderedSections(appCounterSubject)}
      </div>
      ${renderCountDiv({renderCount, name:'isolatedApp'})}
    </div>
  `
}

viewChanged.subscribe(({type, checkTesting}) => {
  activate(type, checkTesting)
})
