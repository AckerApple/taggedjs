// Re-export test functions that work in both environments
// This allows tests to work in both Vitest and browser environments
// Import browser test runner
import * as browserRunner from './testRunner';
// Create environment-aware exports
const isVitest = typeof globalThis.vitest !== 'undefined';
export const it = isVitest
    ? globalThis.it
    : browserRunner.it;
export const describe = isVitest
    ? globalThis.describe
    : browserRunner.describe;
export { expect } from './expect-wrapper';
export const beforeEach = isVitest
    ? globalThis.beforeEach
    : browserRunner.beforeEach;
export const afterEach = isVitest
    ? globalThis.afterEach
    : browserRunner.afterEach;
// Re-export all DOM utilities
export * from './elmSelectors';
export * from './expect.html';
//# sourceMappingURL=index.js.map