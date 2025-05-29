import { ParsedHtml } from "./types.js";
export declare const realTagsRegEx: RegExp;
export declare const findRealTagsRegEx: RegExp;
export declare const fakeTagsRegEx: RegExp;
/** Run only during compile step OR when no compile step occurred at runtime */
export declare function htmlInterpolationToDomMeta(strings: string[], values: unknown[]): ParsedHtml;
export declare function htmlInterpolationToPlaceholders(strings: string[], values: unknown[]): string[];
export declare function balanceArrayByArrays(results: unknown[], strings: string[], values: unknown[]): void;
