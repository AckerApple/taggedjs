import { ParsedHtml } from "./types.js";
/** Run only during compile step OR when no compile step occurred at runtime */
export declare function htmlInterpolationToDomMeta(strings: string[], values: unknown[]): ParsedHtml;
export declare function htmlInterpolationToPlaceholders(strings: string[], values: unknown[]): string[];
export declare function balanceArrayByArrays(results: unknown[], strings: string[], values: unknown[]): void;
