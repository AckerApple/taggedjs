interface Matchers<T> {
    toBe(expected: T, message?: string | (() => string)): void;
    toBeDefined(): void;
    toBeUndefined(): void;
    toBeGreaterThan(expected: number): void;
    toHaveLength(expected: number): void;
    not: {
        toBe(expected: T): void;
    };
}
export declare function createExpect<T>(actual: T): Matchers<T>;
export {};
