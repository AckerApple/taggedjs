import { StringTag } from './getDomTag.function.js';
export declare function cloneValueArray<T>(values: (T | StringTag | StringTag[])[]): T[];
/** clones only what is needed to compare differences later */
export declare function cloneTagJsValue<T>(value: T, maxDepth: number): T;
