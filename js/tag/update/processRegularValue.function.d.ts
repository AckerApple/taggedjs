import { ContextItem } from '../ContextItem.type.js';
export type RegularValue = string | number | undefined | boolean | null;
export declare function processUpdateRegularValue(value: RegularValue, contextItem: ContextItem): void;
/** Used during updates that were another value/tag first but now simple string */
export declare function processNowRegularValue(value: RegularValue, contextItem: ContextItem): void;
