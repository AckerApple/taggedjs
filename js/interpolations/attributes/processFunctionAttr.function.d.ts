import { HowToSet } from './howToSetInputValue.function.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { BaseContextItem } from '../../tag/ContextItem.type.js';
/** Used for bolts like div.style(() => {{backgroundColor:}}) */
export declare function processFunctionAttr(value: never, parentContext: ContextItem, // parent context
attrName: string, element: HTMLElement, howToSet: HowToSet): BaseContextItem;
