import { AnySupport } from '../../tag/index.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { TagVarIdNum } from './getTagJsVar.function.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js';
/** adds onto parent.contexts */
export declare function processTagJsVarAttribute(value: string | TagVarIdNum | null | undefined, contexts: ContextItem[], parentContext: ContextItem, tagJsVar: TagJsVar, varIndex: number, support: AnySupport, attrName: string | TagVarIdNum, element: HTMLElement, isNameVar: boolean): AttributeContextItem;
