import { execute } from "./expect";
export async function runTests() {
    await import('./basic.test'); // not in gh-pages
    await import('./start.test');
    await import('./content.test');
    await import('./counters.test');
    await import('./props.test');
    await import('./providers.test');
    await import('./tagSwitch.test');
    await import('./child.test');
    await import('./array.test');
    await import('./mirror.test');
    await import('./watch.test');
    await import('./oneRender.test');
    await import('./funInProps.test');
    await import('./todos.test');
    await import('./last.test');
    try {
        const start = Date.now(); //performance.now()
        await execute();
        const time = Date.now() - start; // performance.now() - start
        console.info(`✅ all tests passed in ${time}ms`);
        return true;
    }
    catch (error) {
        console.error('❌ tests failed: ' + error.message, error);
        return false;
    }
}
//# sourceMappingURL=tests.js.map