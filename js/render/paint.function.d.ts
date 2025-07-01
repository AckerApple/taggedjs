export type PaintCommand = [((...args: any[]) => unknown), any[]];
/** Typically used for animations to run before clearing elements */
export declare function addPaintRemoveAwait(promise: Promise<any>): void;
export declare let paintCommands: PaintCommand[];
export declare let paintRemoves: PaintCommand[];
export declare let paintContent: PaintCommand[];
export declare let paintAppends: PaintCommand[];
export declare let paintAfters: PaintCommand[];
export declare const painting: {
    locks: number;
    removeLocks: number;
};
export declare function setContent(text: string, textNode: Text): void;
export declare function paint(): any;
export declare function addPaintRemover(element: Text | Element): void;
export declare function paintBefore(relative: Text | Element, element: Text | Element): void;
export declare function paintAppend(relative: Text | Element, element: Text | Element): void;
export declare function paintBeforeText(relative: Text | Element, text: string, callback?: (created: Text) => any): void;
export declare function paintAppendText(relative: Text | Element, text: string, callback: (created: Text) => any): void;
/** Used when HTML content is safe and expected */
export declare function paintBeforeElementString(relative: Text | Element, text: string, callback?: (created: Text) => any): void;
/** Used when HTML content is safe and expected */
export declare function paintAppendElementString(relative: Text | Element, text: string, callback: (created: Text) => any): void;
