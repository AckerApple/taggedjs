// Test runner that works in both browser and Vitest environments
import { expect } from './expect-wrapper';
let currentSuite = null;
let suites = new Map();
let testQueue = [];
let suiteHooks = new Map();
// Check if we're in Vitest environment
const isVitest = typeof globalThis.vitest !== 'undefined';
// Export functions that work in both environments
export const it = isVitest
    ? globalThis.it
    : (name, fn) => {
        const test = { name, fn, suite: currentSuite };
        testQueue.push(test);
        // Add to suite map
        const suiteTests = suites.get(currentSuite) || [];
        suiteTests.push(test);
        suites.set(currentSuite, suiteTests);
    };
export const describe = isVitest
    ? globalThis.describe
    : (name, fn) => {
        const previousSuite = currentSuite;
        currentSuite = name;
        suites.set(name, []);
        suiteHooks.set(name, { beforeEach: [], afterEach: [] });
        fn(); // Execute immediately to collect tests
        currentSuite = previousSuite;
    };
// Re-export expect from wrapper
export { expect };
// Add beforeEach and afterEach support for browser environment
export const beforeEach = isVitest
    ? globalThis.beforeEach
    : (fn) => {
        const hooks = suiteHooks.get(currentSuite) || { beforeEach: [], afterEach: [] };
        hooks.beforeEach.push(fn);
        suiteHooks.set(currentSuite, hooks);
    };
export const afterEach = isVitest
    ? globalThis.afterEach
    : (fn) => {
        const hooks = suiteHooks.get(currentSuite) || { beforeEach: [], afterEach: [] };
        hooks.afterEach.push(fn);
        suiteHooks.set(currentSuite, hooks);
    };
// Execute tests in browser environment
export async function executeBrowserTests() {
    let passed = 0;
    let failed = 0;
    const failures = [];
    console.log(`🧪 Running ${testQueue.length} tests...\n`);
    // Group tests by suite for better output
    const testsBySuite = new Map();
    for (const test of testQueue) {
        const key = test.suite || null;
        const suiteTests = testsBySuite.get(key) || [];
        suiteTests.push(test);
        testsBySuite.set(key, suiteTests);
    }
    // Run tests grouped by suite
    for (const [suiteName, tests] of testsBySuite) {
        if (suiteName) {
            console.log(`${suiteName}`);
        }
        for (const test of tests) {
            const indent = suiteName ? '  ' : '';
            const hooks = suiteHooks.get(test.suite);
            try {
                // Run beforeEach hooks
                if (hooks?.beforeEach) {
                    for (const hook of hooks.beforeEach) {
                        await hook();
                    }
                }
                // Run the test
                await test.fn();
                passed++;
                console.log(`${indent}✅ ${test.name}`);
                // Run afterEach hooks even on success
                if (hooks?.afterEach) {
                    for (const hook of hooks.afterEach) {
                        await hook();
                    }
                }
            }
            catch (error) {
                failed++;
                failures.push({ test: test.name, suite: test.suite, error: error });
                console.error(`${indent}❌ ${test.name}`);
                console.error(error);
                // Try to run afterEach hooks even on failure
                if (hooks?.afterEach) {
                    for (const hook of hooks.afterEach) {
                        try {
                            await hook();
                        }
                        catch (afterError) {
                            console.error('Error in afterEach hook:', afterError);
                        }
                    }
                }
            }
        }
        if (suiteName) {
            console.log(''); // Empty line after suite
        }
    }
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    if (failures.length > 0) {
        console.error('\n❌ Failed Tests:');
        failures.forEach(({ test, suite, error }) => {
            const fullName = suite ? `${suite} > ${test}` : test;
            console.error(`\n${fullName}:`);
            console.error(error);
            if (error.stack) {
                // Try to extract TypeScript file references from stack
                const stackLines = error.stack.split('\n');
                stackLines.forEach(line => {
                    if (line.includes('.ts:') && !line.includes('node_modules')) {
                        console.error(line.trim());
                    }
                });
            }
        });
    }
    // Clear queues for next run
    testQueue = [];
    suites.clear();
    suiteHooks.clear();
    currentSuite = null;
    return failed === 0;
}
//# sourceMappingURL=testRunner.js.map