export type PaintCommand = {
    processor: (...args: any[]) => any;
    args: any[];
};
export declare let paintCommands: PaintCommand[];
export declare let paintContent: (() => any)[];
export declare let setContent: [string, Text][];
export declare let paintAppends: PaintCommand[];
export declare let paintAfters: (() => any)[];
export declare const painting: {
    locks: number;
};
export declare function paint(): void;
export declare function paintRemover(element: Text | Element): void;
export declare function paintBefore(relative: Text | Element, element: Text | Element): void;
export declare function paintAppend(relative: Text | Element, element: Text | Element): void;
export declare function paintBeforeText(relative: Text | Element, text: string, callback?: (created: Text) => any): void;
export declare function paintAppendText(relative: Text | Element, text: string, callback: (created: Text) => any): void;
/** Used when HTML content is safe and expected */
export declare function paintBeforeElementString(relative: Text | Element, text: string, callback?: (created: Text) => any): void;
/** Used when HTML content is safe and expected */
export declare function paintAppendElementString(relative: Text | Element, text: string, callback: (created: Text) => any): void;
