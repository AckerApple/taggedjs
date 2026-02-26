import { ViewTypes } from "./sectionSelector.tag";
import { executeBrowserTests } from "./testing/testRunner";
export async function runIsolatedTests(views, runStartEndTests = true) {
    console.log('🏃 runIsolatedTests: Loading tests for views:', views);
    let testCount = 0;
    if (runStartEndTests) {
        await import('./start.test.js');
        ++testCount;
    }
    if (views.includes(ViewTypes.Content)) {
        await import('./content.test');
        await import('./dumpContent.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Async)) {
        await import('./async.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Subscriptions)) {
        await import('./subscriptions.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Counters)) {
        await import('./counters.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Props)) {
        await import('./props.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.ProviderDebug)) {
        await import('./providers.test');
        await import('./injectionTesting.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.TagSwitchDebug)) {
        await import('./tagSwitch.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Child)) {
        await import('./child.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Arrays)) {
        await import('./arrays.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Mirroring)) {
        await import('./mirror.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.WatchTesting)) {
        await import('./watch.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.FunInPropsTag)) {
        await import('./funInProps.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.AttributeDebug)) {
        await import('./attributes.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.OneRender)) {
        await import('./oneRender.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Todo)) {
        await import('./todos.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Destroys)) {
        await import('./destroys.test');
        ++testCount;
    }
    if (views.includes(ViewTypes.Basic)) {
        await import('./basic.test');
        ++testCount;
    }
    console.debug(`🏃 Running ${testCount} test suites...`);
    try {
        const start = Date.now();
        const result = await executeBrowserTests();
        const time = Date.now() - start;
        console.info(`✅ tests completed in ${time}ms`);
        return result;
    }
    catch (error) {
        console.error('❌ tests failed:', error);
        return false;
    }
}
//# sourceMappingURL=isolatedApp.test.js.map