// Wrapper to provide unified expect interface for both Vitest and browser environments
import { createExpect } from './expect';
// Check if we're in Vitest environment
const isVitest = typeof globalThis.vitest !== 'undefined';
const vitestExpect = isVitest ? globalThis.expect : null;
// Create a unified expect function that supports both syntaxes
export function createUnifiedExpect() {
    if (isVitest && vitestExpect) {
        // In Vitest, create a wrapper that supports custom messages
        return function expect(actual, message) {
            if (message !== undefined) {
                // Return an object that captures the message and provides matchers
                const matchers = vitestExpect(actual);
                return {
                    toBe(expected) {
                        try {
                            matchers.toBe(expected);
                        }
                        catch (error) {
                            // If test fails, throw error with custom message
                            throw new Error(message);
                        }
                    },
                    toBeDefined() {
                        try {
                            matchers.toBeDefined();
                        }
                        catch (error) {
                            throw new Error(message);
                        }
                    },
                    toBeUndefined() {
                        try {
                            matchers.toBeUndefined();
                        }
                        catch (error) {
                            throw new Error(message);
                        }
                    },
                    toBeGreaterThan(expected) {
                        try {
                            matchers.toBeGreaterThan(expected);
                        }
                        catch (error) {
                            throw new Error(message);
                        }
                    },
                    toHaveLength(expected) {
                        try {
                            matchers.toHaveLength(expected);
                        }
                        catch (error) {
                            throw new Error(message);
                        }
                    },
                    not: {
                        toBe(expected) {
                            try {
                                matchers.not.toBe(expected);
                            }
                            catch (error) {
                                throw new Error(message);
                            }
                        }
                    },
                    to: {
                        be: {
                            greaterThan: (expected) => {
                                try {
                                    matchers.toBeGreaterThan(expected);
                                }
                                catch (error) {
                                    throw new Error(message);
                                }
                            }
                        }
                    }
                };
            }
            // Standard Vitest expect with additional properties
            const matchers = vitestExpect(actual);
            return {
                ...matchers,
                // Support chai-style syntax
                to: {
                    be: {
                        greaterThan: (expected) => {
                            return vitestExpect(actual).toBeGreaterThan(expected);
                        }
                    }
                },
                // Support custom message in toBe
                toBe: (expected) => {
                    return matchers.toBe(expected);
                }
            };
        };
    }
    else {
        // In browser, use our custom implementation with extended syntax
        return function expect(actual, message) {
            if (message !== undefined) {
                // Return an object that captures the message and provides all matchers
                const matchers = createExpect(actual);
                return {
                    toBe(expected) {
                        matchers.toBe(expected, message);
                    },
                    toBeDefined() {
                        matchers.toBeDefined();
                    },
                    toBeUndefined() {
                        matchers.toBeUndefined();
                    },
                    /*
                    toBeGreaterThan(expected: number) {
                      matchers.toBeGreaterThan(expected)
                    },
                    */
                    toHaveLength(expected) {
                        matchers.toHaveLength(expected);
                    },
                    not: {
                        toBe(expected) {
                            matchers.not.toBe(expected);
                        }
                    },
                    to: {
                        be: {
                            greaterThan: (expected) => {
                                matchers.toBeGreaterThan(expected);
                            }
                        }
                    }
                };
            }
            const matchers = createExpect(actual);
            return {
                ...matchers,
                // Support chai-style syntax
                to: {
                    be: {
                        greaterThan: (expected) => {
                            matchers.toBeGreaterThan(expected);
                        }
                    }
                }
            };
        };
    }
}
export const expect = createUnifiedExpect();
//# sourceMappingURL=expect-wrapper.js.map