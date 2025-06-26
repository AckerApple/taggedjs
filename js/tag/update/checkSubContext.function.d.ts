import { AnySupport } from '../AnySupport.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { TagCounts } from '../TagCounts.type.js';
export declare function checkSubContext(newValue: unknown, ownerSupport: AnySupport, contextItem: ContextItem, values: any[], counts: TagCounts): -1 | 99;
export declare function handleTagTypeChangeFrom(originalType: string, newValue: unknown, ownerSupport: AnySupport, contextItem: ContextItem, counts: TagCounts): 99 | undefined;
