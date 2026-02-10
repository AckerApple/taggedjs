import { AnySupport } from '../../tag/index.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { TagVarIdNum } from './getTagJsTag.function.js';
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js';
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js';
/** adds onto parent.contexts */
export declare function processTagJsTagAttribute(value: string | TagVarIdNum | null | undefined, contexts: ContextItem[], parentContext: ContextItem, tagJsVar: TagJsTag, varIndex: number, support: AnySupport, attrName: string | TagVarIdNum, element: HTMLElement, isNameVar: boolean): AttributeContextItem;
