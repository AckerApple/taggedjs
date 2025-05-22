import { HowToSet } from './howToSetInputValue.function.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
export declare function updateNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, lastValue: string | Record<string, any> | undefined, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: ContextItem[], counts: TagCounts): void;
