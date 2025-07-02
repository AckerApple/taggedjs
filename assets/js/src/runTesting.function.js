import { storage } from "./sectionSelector.tag";
import { runIsolatedTests } from "./isolatedApp.test";
let testTimeout = null;
export function runTesting(manual = true, tests, runStartEndTests) {
    if (testTimeout !== null) {
        clearTimeout(testTimeout);
        console.debug(`🏃 Cleared previous testing to start again...`);
    }
    const waitFor = 2000;
    testTimeout = setTimeout(async () => {
        tests = tests || storage.views;
        console.debug(`🏃 Prepare test suites...`);
        const result = await runIsolatedTests(tests, runStartEndTests);
        if (!manual) {
            return;
        }
        if (result) {
            alert('✅ all app tests passed');
            return;
        }
        alert('❌ tests failed. See console for more details');
    }, waitFor); // cause delay to be separate from renders
}
//# sourceMappingURL=runTesting.function.js.map