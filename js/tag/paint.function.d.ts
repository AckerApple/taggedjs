type PaintAppend = {
    element: Text | Element;
    relative: Text | Element;
};
type PaintCommand = {
    processor: (element: Text | Element, relative?: Text | Element) => any;
    element: Text | Element;
    relative?: Text | Element;
};
export declare let paintCommands: PaintCommand[];
export declare let paintContent: (() => any)[];
export declare let setContent: [string, Text][];
export declare let paintAppends: PaintAppend[];
export declare let paintAfters: (() => any)[];
export declare const painting: {
    locks: number;
};
export declare function paint(): void;
export declare function paintRemover(element: Text | Element): void;
export declare function paintBefore(element: Text | Element, relative?: Text | Element): void;
export {};
