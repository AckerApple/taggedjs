import type { TagCounts } from '../../tag/TagCounts.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
export declare function processTagComponentInit(value: TagJsVar, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: TagCounts, // {added:0, removed:0}
appendTo?: Element): AnySupport | undefined;
