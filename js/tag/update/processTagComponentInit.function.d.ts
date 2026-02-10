import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js';
export declare function processTagComponentInit(value: TagJsTag, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
_insertBefore?: Text, appendTo?: Element): AnySupport | undefined;
