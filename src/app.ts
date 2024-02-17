import { attributeDebug } from "./attributeDebug.component.js"
import { contentDebug } from "./ContentDebug.component.js"
import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests.js"
import { tableDebug } from "./tableDebug.component.js"
import { html, tag, state, tagElement } from "taggedjs"
import { tagDebug } from "./tagJsDebug.js"
import { tagSwitchDebug } from "./tagSwitchDebug.component.js"

export const App = tag(function App(){
  let _firstState: string = state('app first state')(x => [_firstState, _firstState=x])
  let toggleValue: boolean = state(false)(x => [toggleValue, toggleValue=x])
  let renderCount: number = state(0)(x => [renderCount, renderCount=x])

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
  tagElement(App, element, {test:1})
}
