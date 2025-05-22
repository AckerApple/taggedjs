import type { TagCounts } from '../../tag/TagCounts.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
export declare function processTagInit(value: TagJsVar, contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts, appendTo?: Element | undefined, insertBefore?: Text): AnySupport;
