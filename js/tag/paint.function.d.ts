type PaintAppend = {
    element: Text | Element;
    relative: Text | Element;
};
export declare let paintRemoves: (Element | Text | ChildNode)[];
export declare let paintContent: (() => any)[];
export declare let setContent: [string, Text][];
/** array memory that runs and completes BEFORE paintInsertBefores array */
export declare let paintAppends: PaintAppend[];
/** array memory that runs and completes AFTER paintAppends array */
export declare let paintInsertBefores: PaintAppend[];
export declare let paintAfters: (() => any)[];
export declare const painting: {
    locks: number;
};
export declare function paint(): void;
export {};
