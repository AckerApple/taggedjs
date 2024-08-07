import { html, Subject } from "taggedjs";
import { runTesting } from "./runTesting.function";
export const storage = getScopedStorage();
function getScopedStorage() {
    const string = localStorage.taggedjs || JSON.stringify({ autoTest: true, views: [] });
    return JSON.parse(string);
}
export function saveScopedStorage() {
    localStorage.taggedjs = JSON.stringify(storage);
}
export var ViewTypes;
(function (ViewTypes) {
    ViewTypes["Todo"] = "todo";
    ViewTypes["FunInPropsTag"] = "funInPropsTag";
    ViewTypes["OneRender"] = "oneRender";
    ViewTypes["WatchTesting"] = "watchTesting";
    ViewTypes["Mirroring"] = "mirroring";
    ViewTypes["Content"] = "content";
    ViewTypes["Arrays"] = "arrays";
    ViewTypes["Counters"] = "counters";
    ViewTypes["TableDebug"] = "tableDebug";
    ViewTypes["Props"] = "props";
    ViewTypes["Child"] = "child";
    ViewTypes["TagSwitchDebug"] = "tagSwitchDebug";
    ViewTypes["ProviderDebug"] = "providerDebug";
})(ViewTypes || (ViewTypes = {}));
const viewTypes = Object.values(ViewTypes);
export const sections = () => html `
  <div>
    <h3>Sections</h3>
    <!-- checkbox menu -->
    <div style="display:flex;gap:1em;flex-wrap:wrap;margin:1em;">
      ${viewTypes.map(type => html `
        <div>
          <input type="checkbox"
            id=${'view-type-' + type} name=${'view-type-' + type}
            ${storage.views.includes(type) && 'checked'}
            onclick=${() => toggleViewType(type)}
          />
          <label for=${'view-type-' + type}>&nbsp;${type}</label>
        </div>
      `.key(type))}
      <div>
        <label onclick=${() => viewTypes.forEach(viewType => {
    // viewChanged.next({viewType, checkTesting: false})
    activate(viewType, false);
    saveScopedStorage();
})}>&nbsp;all</label>
      </div>
      <div>
        <label onclick=${() => viewTypes.forEach(viewType => {
    deactivate(viewType);
    saveScopedStorage();
})}>&nbsp;none</label>
      </div>
    </div>
  </div>
`;
function toggleViewType(type, checkTesting = true) {
    if (storage.views.includes(type)) {
        deactivate(type);
    }
    else {
        viewChanged.next({ type, checkTesting });
    }
    saveScopedStorage();
}
export const viewChanged = new Subject();
function deactivate(type) {
    (storage.views = storage.views.filter(x => x !== type));
}
export function activate(type, checkTesting = true) {
    storage.views.push(type);
    if (checkTesting && storage.autoTest) {
        runTesting();
    }
}
//# sourceMappingURL=sections.tag.js.map