import { DomObjectElement, ObjectElement, ObjectText } from "./ObjectNode.types.js";
export declare function htmlInterpolationToDomMeta(strings: string[], values: unknown[]): (ObjectText | DomObjectElement)[];
export declare function exchangeParsedForValues(parsedElements: (ObjectElement | ObjectText)[], values: unknown[]): (ObjectText | ObjectElement)[];
export declare function balanceArrayByArrays(results: unknown[], strings: string[], values: unknown[]): void;
