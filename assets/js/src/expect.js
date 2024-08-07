const onlyTests = [];
let tests = [];
let tab = 0;
export function describe(label, run) {
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
    console.debug('⏭️ Skipped ' + label);
};
describe.only = function only(label, run) {
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
    console.debug('⏭️ Skipped ' + label);
};
function clearTests() {
    onlyTests.length = 0;
    tests.length = 0;
}
export async function execute() {
    if (onlyTests.length) {
        return runTests(onlyTests);
    }
    return runTests(tests);
}
async function runTests(tests) {
    for (const test of tests) {
        try {
            await test();
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