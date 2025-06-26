import { StringTag } from './StringTag.type.js';
import { Tag } from './Tag.type.js';
import { TagCounts, AnySupport, ContextItem } from '../index.js';
/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
export declare function processOuterDomTagInit(value: Tag, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: TagCounts, appendTo?: Element, insertBefore?: Text): void;
/** When runtime is in browser */
export declare function getStringTag(strings: string[], values: unknown[]): StringTag;
