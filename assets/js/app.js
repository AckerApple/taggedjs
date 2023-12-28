import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests.js"
import { html, tag, renderAppToElement } from "./taggedjs/index.js"
import { tagDebug } from "./tagJsDebug.js"


export const App = tag(function App(){
  return html`
    <h1>🏷️ TaggedJs</h1>
    ${tagDebug()}

    <h3>Children Test</h3>
    ${innerHtmlTest(html`
      <b>Field set body</b>
    `)}

    ${innerHtmlPropsTest(33, html`
      <b>Field set body</b>
    `)}
  `
})

export default () => {
  console.info('attaching to element...')
  const element = document.getElementsByTagName('app')[0]
  renderAppToElement(App, element, {test:1})
}
