export declare function sleep(ms: number): Promise<unknown>;
export declare function expectElmCount(query: string, count: number, message?: string): NodeListOf<Element>;
export declare function expectMatchedHtml(...queries: string[]): void;
export declare function expectHTML(selector: string, expectedHtml: string, message?: string): void;
/** increases counter by two */
export declare function testCounterElements(counterButtonSelect: string, counterDisplaySelect: string, { elementCountExpected }?: {
    elementCountExpected: number;
}): void;
export declare function testDuelCounterElements(...sets: [string, string][]): void;
