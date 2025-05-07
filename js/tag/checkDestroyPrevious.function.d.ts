import { ContextItem } from './Context.types.js';
export declare function checkArrayValueChange(newValue: unknown, subject: ContextItem): false | 9;
export declare function destroyArray(subject: ContextItem, lastArray: any[]): void;
export declare function checkSimpleValueChange(newValue: unknown, contextItem: ContextItem): -1 | 6;
export declare function deleteSimpleValue(subject: ContextItem): void;
