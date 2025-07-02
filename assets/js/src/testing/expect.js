const onlyTests = [];
let tests = [];
let tab = 0;
// Flag to control whether to use Mocha/Chai
let useMochaEnabled = false;
let hasOnlyTests = false;
// Enable Mocha/Chai integration (call this before running tests if you want to use Mocha)
export function enableMocha() {
    useMochaEnabled = true;
}
// Auto-enable Mocha if .only is detected
function checkForOnlyTests() {
    return hasOnlyTests || onlyTests.length > 0;
}
// Dynamically load Mocha/Chai if not already loaded
async function ensureMochaChaiLoaded() {
    if (!useMochaEnabled || typeof window === 'undefined' || (window.mocha && window.chai)) {
        return;
    }
    try {
        // Load Chai
        const chaiScript = document.createElement('script');
        chaiScript.src = 'https://cdn.jsdelivr.net/npm/chai@4/chai.js';
        await new Promise((resolve, reject) => {
            chaiScript.onload = resolve;
            chaiScript.onerror = reject;
            document.head.appendChild(chaiScript);
        });
        // Load Mocha (browser version without require)
        const mochaScript = document.createElement('script');
        mochaScript.src = 'https://unpkg.com/mocha@10/mocha.js';
        await new Promise((resolve, reject) => {
            mochaScript.onload = resolve;
            mochaScript.onerror = reject;
            document.head.appendChild(mochaScript);
        });
        // Load Mocha CSS
        const mochaCSS = document.createElement('link');
        mochaCSS.rel = 'stylesheet';
        mochaCSS.href = 'https://unpkg.com/mocha@10/mocha.css';
        document.head.appendChild(mochaCSS);
        // Setup Mocha only if it loaded successfully
        if (window.mocha && typeof window.mocha.setup === 'function') {
            window.mocha.setup({
                ui: 'bdd',
                reporter: 'spec',
                timeout: 5000
            });
            // Create mocha container if needed
            if (!document.getElementById('mocha')) {
                const mochaDiv = document.createElement('div');
                mochaDiv.id = 'mocha';
                document.body.appendChild(mochaDiv);
            }
        }
    }
    catch (error) {
        console.warn('Failed to load Mocha/Chai, falling back to custom test framework:', error);
        // Ensure window properties are cleared on failure
        delete window.mocha;
        delete window.chai;
        useMochaEnabled = false;
    }
}
// Check if we should use Mocha
function shouldUseMocha() {
    return useMochaEnabled && typeof window !== 'undefined' && window.mocha && window.chai;
}
export function describe(label, run) {
    if (shouldUseMocha()) {
        // Use Mocha's describe
        return window.describe(label, run);
    }
    // Fallback to custom implementation
    tests.push(async function itTest() {
        const oldTests = tests;
        tests = [];
        try {
            console.debug('  '.repeat(tab) + '↘ ' + label);
            ++tab;
            await run();
            await runTests(tests);
            --tab;
        }
        catch (error) {
            --tab;
            // console.debug(' '.repeat(tab) + '❌ ' + label)
            throw error;
        }
        finally {
            tests = oldTests;
        }
    });
}
describe.skip = function skip(label, run) {
    if (shouldUseMocha()) {
        return window.describe.skip(label, run);
    }
    console.debug('⏭️ Skipped ' + label);
};
describe.only = function only(label, run) {
    hasOnlyTests = true; // Mark that we have .only tests
    if (shouldUseMocha()) {
        return window.describe.only(label, run);
    }
    onlyTests.push(async () => {
        const oldTests = tests;
        tests = [];
        try {
            console.debug('  '.repeat(tab) + '↘ ' + label);
            ++tab;
            await run();
            await runTests(tests);
            --tab;
        }
        catch (error) {
            --tab;
            // console.debug(' '.repeat(tab) + '❌ ' + label)
            throw error;
        }
        finally {
            tests = oldTests;
        }
    });
};
export function it(label, run) {
    if (shouldUseMocha()) {
        // Use Mocha's it
        return window.it(label, run);
    }
    // Fallback to custom implementation
    tests.push(async function pushIt() {
        try {
            const start = Date.now();
            await run();
            const time = Date.now() - start;
            console.debug(' '.repeat(tab) + `✅ ${label} - ${time}ms`);
        }
        catch (error) {
            console.debug(' '.repeat(tab) + '❌ ' + label);
            throw error;
        }
    });
}
it.only = (label, run) => {
    hasOnlyTests = true; // Mark that we have .only tests
    if (shouldUseMocha()) {
        return window.it.only(label, run);
    }
    onlyTests.push(async function pushOnlyTest() {
        try {
            const start = Date.now();
            await run();
            const time = Date.now() - start;
            console.debug(`✅ ${label} - ${time}ms`);
        }
        catch (error) {
            console.debug('❌ ' + label);
            throw error;
        }
    });
};
it.skip = function skip(label, run) {
    if (shouldUseMocha()) {
        return window.it.skip(label, run);
    }
    console.debug('⏭️ Skipped ' + label);
};
function clearTests() {
    onlyTests.length = 0;
    tests.length = 0;
    hasOnlyTests = false;
}
export async function execute(afterEachSuite) {
    // Auto-enable Mocha if .only tests are detected
    if (checkForOnlyTests()) {
        console.info('🎯 Detected .only tests, enabling Mocha/Chai for proper test isolation');
        useMochaEnabled = true;
    }
    // Load Mocha/Chai if available
    await ensureMochaChaiLoaded();
    if (shouldUseMocha()) {
        // Wait a bit to ensure all tests are registered
        await new Promise(resolve => setTimeout(resolve, 100));
        // Run tests with Mocha
        return new Promise((resolve, reject) => {
            const runner = window.mocha.run((failures) => {
                if (failures > 0) {
                    reject(new Error(`${failures} test(s) failed`));
                }
                else {
                    resolve(undefined);
                }
            });
            // Apply custom reporter to match existing console output
            runner.on('suite', function (suite) {
                if (suite.title) {
                    console.debug('  '.repeat(suite.depth || 0) + '↘ ' + suite.title);
                }
            });
            runner.on('pass', function (test) {
                const depth = test.parent?.depth || 0;
                console.debug(' '.repeat(depth + 1) + `✅ ${test.title} - ${test.duration}ms`);
            });
            runner.on('fail', function (test, err) {
                const depth = test.parent?.depth || 0;
                console.error(' '.repeat(depth + 1) + `❌ ${test.title}`);
                console.error(err);
            });
            runner.on('end', function () {
                const stats = runner.stats;
                if (stats.failures === 0) {
                    console.info(`✅ ${stats.passes} tests passed in ${stats.duration}ms`);
                }
            });
        });
    }
    // Fallback to custom implementation
    if (onlyTests.length) {
        console.log('🏃 Running only mode...');
        return runTests(onlyTests, afterEachSuite);
    }
    return runTests(tests, afterEachSuite);
}
async function runTests(tests, afterEachSuite = () => undefined) {
    for (const test of tests) {
        try {
            await test();
            afterEachSuite(test);
        }
        catch (err) {
            console.error(`Error testing ${test.name}`);
            clearTests();
            throw err;
        }
    }
    clearTests();
}
export function expect(expected) {
    if (shouldUseMocha()) {
        // Use Chai's expect with compatibility layer
        const chaiExpect = window.chai.expect(expected);
        // Add compatibility methods for existing tests
        return Object.assign(chaiExpect, {
            toBe(value) {
                return chaiExpect.to.equal(value);
            },
            toBeDefined() {
                return chaiExpect.to.not.be.undefined;
            },
            toBeGreaterThan(n) {
                return chaiExpect.to.be.greaterThan(n);
            },
            toBeLessThan(n) {
                return chaiExpect.to.be.lessThan(n);
            }
        });
    }
    // Fallback to custom implementation
    return {
        toBeDefined: function toBeDefined(customMessage) {
            if (expected !== undefined && expected !== null) {
                return;
            }
            if (customMessage instanceof Function) {
                customMessage = customMessage();
            }
            const message = customMessage || `Expected ${JSON.stringify(expected)} to be defined`;
            console.error(message, { expected });
            throw new Error(message);
        },
        toBe: function toBe(received, customMessage) {
            if (expected === received) {
                return;
            }
            if (customMessage instanceof Function) {
                customMessage = customMessage();
            }
            const message = customMessage || `Expected ${typeof (expected)} ${JSON.stringify(expected)} to be ${typeof (received)} ${JSON.stringify(received)}`;
            console.error(message, { toBe: received, expected });
            throw new Error(message);
        },
        toBeGreaterThan: function toBeGreaterThan(amount, customMessage) {
            const expectNum = expected;
            if (!isNaN(expectNum) && expectNum > amount) {
                return;
            }
            const message = customMessage || `Expected ${typeof (expected)} ${JSON.stringify(expected)} to be greater than amount`;
            console.error(message, { amount, expected });
            throw new Error(message);
        },
        toBeLessThan: function toBeLessThan(amount, customMessage) {
            const expectNum = expected;
            if (!isNaN(expectNum) && expectNum < amount) {
                return;
            }
            const message = customMessage || `Expected ${typeof (expected)} ${JSON.stringify(expected)} to be less than amount`;
            console.error(message, { amount, expected });
            throw new Error(message);
        }
    };
}
//# sourceMappingURL=expect.js.map