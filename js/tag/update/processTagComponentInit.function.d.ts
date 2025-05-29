import type { TagCounts } from '../../tag/TagCounts.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
export declare function processTagComponentInit(value: TagJsVar, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: TagCounts, appendTo?: Element): AnySupport | undefined;
