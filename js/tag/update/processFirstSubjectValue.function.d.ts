import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
export declare function processFirstSubjectValue(value: TagJsVar, tagJsVar: TagJsVar, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
insertBefore?: Text, appendTo?: Element): AnySupport | undefined;
