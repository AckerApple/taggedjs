import { tag, input, button, div } from "taggedjs";
import { saveScopedStorage, storage } from "./sectionSelector.tag";
import { runTesting } from "./runTesting.function";
export const autoTestingControls = tag((tests, runStartEndTests) => {
    if (storage.autoTest) {
        runTesting(false, tests, runStartEndTests);
    }
    return div('auto testing ', input.type `checkbox`.onChange(toggleAutoTesting).checked(_ => storage.autoTest)(), button.type `button`.onClick(() => runTesting(true, tests, runStartEndTests))('run tests'));
});
function toggleAutoTesting() {
    storage.autoTest = storage.autoTest = !storage.autoTest;
    saveScopedStorage();
}
//# sourceMappingURL=autoTestingControls.tag.js.map