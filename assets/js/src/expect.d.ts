export declare function describe(label: string, run: () => any): void;
export declare namespace describe {
    var skip: (label: string, run: () => any) => void;
    var only: (label: string, run: () => any) => void;
}
export declare function it(label: string, run: () => any): void;
export declare namespace it {
    var only: (label: string, run: () => any) => void;
    var skip: (label: string, run: () => any) => void;
}
export declare function execute(): Promise<void>;
export declare function expect(expected: unknown): {
    toBeDefined: (customMessage?: string | Function) => void;
    toBe: (received: unknown, customMessage?: string | Function) => void;
    toBeGreaterThan: (amount: number, customMessage?: string) => void;
    toBeLessThan: (amount: number, customMessage?: string) => void;
};