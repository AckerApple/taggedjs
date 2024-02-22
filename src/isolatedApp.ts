import { childTests } from "./childTests.js"
import { html, tag } from "taggedjs"
import { gatewayDebug } from "./gatewayDebug.component.js"

export const IsolatedApp = tag(() => {
  // const component = childTests() as any
  // const template = component.wrapper().getTemplate()
  
  return html`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset style="flex:2 2 20em">
          <legend>gatewayDebug</legend>
          ${gatewayDebug()}
        </fieldset>

        ${/*
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${childTests()}
          </fieldset>
        */false}

        ${/*
          <textarea style="min-width:50vw;height:400px">${ template.string }</textarea>
          <textarea style="min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
          */ false
        }
      </div>
    </div>
  `
})
