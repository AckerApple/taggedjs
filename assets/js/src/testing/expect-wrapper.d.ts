interface Matchers<T> {
    toBe(expected: T, message?: string | (() => string)): void;
    toBeDefined(): void;
    toBeUndefined(): void;
    toBeGreaterThan(expected: number, message?: string | (() => string)): void;
    toHaveLength(expected: number): void;
    not: {
        toBe(expected: T): void;
    };
    to: {
        be: {
            greaterThan(expected: number): void;
        };
    };
}
interface MessageMatchers<T> extends Matchers<T> {
}
interface ExpectFunction {
    <T>(actual: T): Matchers<T>;
    <T>(actual: T, message: string): MessageMatchers<T>;
}
export declare function createUnifiedExpect(): ExpectFunction;
export declare const expect: ExpectFunction;
export {};
