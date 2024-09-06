import { ObjectChildren } from "./LikeObjectElement.type.js";
import { DomObjectElement, ObjectElement, ObjectText } from "./ObjectNode.types.js";
export declare function htmlInterpolationToDomMeta(strings: string[], values: unknown[]): ParsedHtml;
export declare function htmlInterpolationToPlaceholders(strings: string[], values: unknown[]): string[];
export type OneUnparsedHtml = (ObjectElement | ObjectText) & {
    ch?: ObjectChildren;
    at?: any[];
};
export type UnparsedHtml = OneUnparsedHtml[];
export type ParsedHtml = (DomObjectElement | ObjectText)[];
export declare function parseHTML(html: string): ParsedHtml;
export declare function balanceArrayByArrays(results: unknown[], strings: string[], values: unknown[]): void;
