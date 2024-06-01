export declare function expectMatchedHtml(...queries: string[]): void;
export declare function expectHTML(query: string, innerHTML: string): void;
export declare function expectElmCount(query: string, count: number, message?: string): NodeListOf<Element>;
export declare function testDuelCounterElements(...sets: [string, string][]): void;
/** increases counter by two */
export declare function testCounterElements(counterButtonSelect: string, counterDisplaySelect: string, { elementCountExpected }?: {
    elementCountExpected: number;
}): void;
