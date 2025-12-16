import { StringTag } from './StringTag.type.js';
import { Tag } from './Tag.type.js';
import { AnySupport, ContextItem, ArrayItemStringTag } from '../index.js';
/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
export declare function processOuterDomTagInit(value: Tag, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
insertBefore?: Text, appendTo?: Element): void;
/** tag(html``) When runtime is in browser */
export declare function getStringTag(strings: string[], values: unknown[]): StringTag;
export declare function keyTag<T>(arrayValue: T, tag: any): ArrayItemStringTag<T>;
