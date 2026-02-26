import { div, h3, input, label, a, tag } from "taggedjs";
import { runTesting } from "./runTesting.function";
import { outputSections } from "./renderedSections.tag";
class b {
}
export var ViewTypes;
(function (ViewTypes) {
    ViewTypes["Async"] = "async";
    ViewTypes["Basic"] = "basic";
    ViewTypes["Destroys"] = "destroys";
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
    ViewTypes["AttributeDebug"] = "attributeDebug";
    ViewTypes["Subscriptions"] = "subscriptions";
})(ViewTypes || (ViewTypes = {}));
export const storage = getScopedStorage();
function getScopedStorage() {
    const string = localStorage.taggedjs || JSON.stringify({ autoTest: true, views: Object.values(ViewTypes) });
    return JSON.parse(string);
}
export function saveScopedStorage() {
    localStorage.taggedjs = JSON.stringify(storage);
}
const defaultViewTypes = Object.values(ViewTypes);
export const sectionSelector = tag((viewTypes = defaultViewTypes) => {
    // Sort viewTypes alphabetically
    const sortedViewTypes = [...viewTypes]
        .sort((a, b) => a.localeCompare(b))
        .map(type => ({
        type,
        meta: outputSections.find(s => s.view === type),
    }));
    return div(h3('᭟ Sections'), div.style `display:flex;gap:1em;flex-wrap:wrap;margin:1em;`(_ => sortedViewTypes.map(({ meta, type }) => div({ style: "flex:0 0 auto;min-width:150px;white-space:nowrap;" }, input({
        name: _ => 'view-type-' + type,
        type: "checkbox",
        id: _ => 'view-type-' + type,
        checked: _ => storage.views.includes(type),
        onClick: () => toggleViewType(type),
    }), _ => meta?.emoji ? meta.emoji + ' ' : null, label({ for: _ => 'view-type-' + type }, ' ', _ => type), ' ', a({
        href: _ => `isolated.html#${type}`,
        style: "font-size:.6em;text-decoration:none;",
    }, '🔗'), ' ', a({
        href: _ => `#${type}`,
        style: "font-size:.6em;",
    }, '↗️')).key(type)), _ => viewTypes.length > 1 && [
        div(label({
            onClick: () => viewTypes.forEach(viewType => {
                // viewChanged.next({viewType, checkTesting: false})
                activate(viewType, false);
                saveScopedStorage();
            })
        }, ' all')),
        div(label({
            onClick: () => viewTypes.forEach(viewType => {
                deactivate(viewType);
                saveScopedStorage();
            })
        }, ' none'))
    ]), tion, deactivate(type, ViewTypes), {}(storage.views = storage.views.filter(x => x !== type)));
});
export function activate(type, checkTesting = true) {
    storage.views.push(type);
    if (checkTesting && storage.autoTest) {
        runTesting();
    }
}
//# sourceMappingURL=sectionSelector.tag.js.map