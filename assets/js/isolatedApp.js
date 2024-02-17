import { tableDebug } from "./tableDebug.component.js";
import { html, tag } from "taggedjs";
export const IsolatedApp = tag(() => {
    const component = tableDebug();
    const template = component.wrapper().getTemplate();
    return html `<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${tableDebug()}
        </fieldset>

        <textarea style="min-width:50vw;height:400px">${template.string}</textarea>
        <textarea style="min-width:50vw;height:400px">${JSON.stringify(template, null, 2)}</textarea>
      </div>
    </div>
  `;
});
//# sourceMappingURL=isolatedApp.js.map