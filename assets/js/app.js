import { contentDebug } from "./ContentDebug.component.js"
import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests.js"
import { html, tag, renderAppToElement, state } from "./taggedjs/index.js"
import { tagDebug } from "./tagJsDebug.js"
import { tagSwitchDebug } from "./tagSwitchDebug.component.js"

export const App = tag(function App(){
  let _firstState = state('app first state', x => [_firstState, _firstState=x])
  let toggleValue = state(false, x => [toggleValue, toggleValue=x])
  let renderCount = state(false, x => [renderCount, renderCount=x])

  const toggle = () => {
    toggleValue = !toggleValue
    console.log('toggled to',toggleValue)
  }

  ++renderCount

  return html`<!--app.js-->
    <h1 id="app">🏷️ TaggedJs - ${2+2}</h1>

    <button onclick=${toggle}>toggle test ${toggleValue}</button>

    <h3 id="debugging">Debugging</h3>
    <div><small>(app render count: ${renderCount})</small></div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${tagDebug()}

        ${childContentTest({legend: 'Children Test', id:'children-test'}, html`
          ${innerHtmlTest(html`
              <b>Field set body</b>
            `)}
            ${innerHtmlPropsTest(33, html`
              <b>Field set body</b>
            `)}
        `)}

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${contentDebug()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${tagSwitchDebug()}
        </fieldset>
      </div>            
    </div>
  `
})

export const childContentTest = tag(({legend, id}, children) => {
  return html`
    <fieldset id=${id} style="flex:2 2 20em">
      <legend>${legend}</legend>
      ${children}
    </fieldset>
  `
})

export default () => {
  console.info('attaching to element...')
  const element = document.getElementsByTagName('app')[0]
  console.log('App',App)
  renderAppToElement(App, element, {test:1})
}
