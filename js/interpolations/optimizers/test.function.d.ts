import { ObjectElement, ObjectText } from "./ObjectNode.types.js";
export type ValuePos = {
    set: (elements: any, value: any) => any;
    isAttr?: boolean;
};
export type DomMetaMap = {
    domMeta: (ObjectElement | ObjectText)[];
    pos: ValuePos[];
};
export declare function replaceHoldersByPosMaps(parsedElements: (ObjectElement | ObjectText)[], values: unknown[], valuePositions: ValuePos[]): void;
