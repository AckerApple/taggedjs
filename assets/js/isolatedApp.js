import { html, set, tag } from "taggedjs";
import { arrayTests } from "./arrayTests.js";
export const IsolatedApp = tag(() => {
    const stateTest = set('isolated-app-state');
    // const component = childTests() as any
    // const template = component.wrapper().getTemplate()
    return html `<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${ /*
    <fieldset style="flex:2 2 20em">
      <legend>propsDebugMain</legend>
      ${propsDebugMain()}
    </fieldset>
    */false}

        ${ /*
    <fieldset style="flex:2 2 20em">
      <legend>providerDebugBase</legend>
      ${providerDebugBase()}
    </fieldset>
    */false}

        ${ /*
    <fieldset style="flex:2 2 20em">
      <legend>tagSwitchDebug</legend>
      ${tagSwitchDebug()}
    </fieldset>
    */false}

        <fieldset style="flex:2 2 20em">
          <legend>arrays</legend>
          ${arrayTests()}
        </fieldset>

        ${ /*
    <fieldset style="flex:2 2 20em">
      <legend>Children Tests</legend>
      ${childTests()}
    </fieldset>
    */false}

        ${ /*
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ template.string }</textarea>
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
      */false}
      </div>
    </div>
  `;
});
//# sourceMappingURL=isolatedApp.js.map