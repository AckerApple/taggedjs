import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
export declare function processTagComponentInit(value: TagJsVar, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
_insertBefore?: Text, appendTo?: Element): AnySupport | undefined;
