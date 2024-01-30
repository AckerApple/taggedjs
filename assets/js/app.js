import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests.js"
import { html, tag, renderAppToElement, state } from "./taggedjs/index.js"
import { tagDebug } from "./tagJsDebug.js"

export const App = tag(function App(){
  let toggleValue = state(false, x => [toggleValue, toggleValue=x])

  const toggle = () => {
    toggleValue = !toggleValue
    console.log('toggled to',toggleValue)
  }

  return html`<!--app.js-->
    <h1 id="app">🏷️ TaggedJs** - ${2+2}</h1>

    <button onclick=${toggle}>toggle test ${toggleValue}</button>

    <h3 id="debugging">Debugging</h3>
    ${tagDebug()}

    <h3 id="children-test">Children Test</h3>
    ${innerHtmlTest(html`
      <b>Field set body</b>
    `)}

    ${innerHtmlPropsTest(33, html`
      <b>Field set body</b>
    `)}

    **${3+4}**
  `
})

export default () => {
  console.info('attaching to element...')
  const element = document.getElementsByTagName('app')[0]
  console.log('App',App)
  renderAppToElement(App, element, {test:1})
}
