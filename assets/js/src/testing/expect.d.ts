declare global {
    interface Window {
        mocha: any;
        chai: any;
        describe: any;
        it: any;
    }
}
type Test = () => unknown;
export declare function enableMocha(): void;
export declare function describe(label: string, run: () => any): any;
export declare namespace describe {
    var skip: (label: string, run: () => any) => any;
    var only: (label: string, run: () => any) => any;
}
export declare function it(label: string, run: () => any): any;
export declare namespace it {
    var only: (label: string, run: () => any) => any;
    var skip: (label: string, run: () => any) => any;
}
export declare function execute(afterEachSuite?: (test: Test) => any): Promise<unknown>;
export declare function expect(expected: unknown): any;
export {};
