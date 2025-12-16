/** A function expected to paint by commands such as a html painter that renders elements */
export type painter = (...args: any[]) => unknown;
export type PaintCommand = [
    painter,
    /** arguments for the painter */
    any[]
];
/** Typically used for animations to run before clearing elements */
export declare function addPaintRemoveAwait(_promise: Promise<any>): void;
export declare let paintCommands: PaintCommand[];
export declare const paintRemoves: PaintCommand[];
export declare let paintContent: PaintCommand[];
export declare let paintAppends: PaintCommand[];
export declare let paintAfters: PaintCommand[];
export declare const painting: {
    locks: number;
    removeLocks: number;
};
export declare function setContent(text: string, textNode: Text): void;
/** you must lock before calling this function */
export declare function paint(): any;
export declare function addPaintRemover(element: Text | Element, caller?: string): void;
/** insertBefore. For parent.appendChild() see paintAppend */
export declare function paintBefore(relative: Text | Element, element: Text | Element, _caller: string): void;
/** parent.appendChild(). For insertBefore see paintBefore */
export declare function paintAppend(relative: Text | Element, element: Text | Element): void;
export declare function paintBeforeText(relative: Text | Element, text: string, callback: ((created: Text) => any) | undefined, _caller: string): void;
export declare function paintAppendText(relative: Text | Element, text: string, callback: (created: Text) => any): void;
/** Used when HTML content is safe and expected */
export declare function paintBeforeElementString(relative: Text | Element, text: string, callback?: (created: Text) => any): void;
/** Used when HTML content is safe and expected */
export declare function paintAppendElementString(relative: Text | Element, text: string, callback: (created: Text) => any): void;
