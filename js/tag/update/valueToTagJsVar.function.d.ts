import { ContextItem } from '../ContextItem.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
import { Tag } from '../Tag.type.js';
export declare function valueToTagJsVar(value: TemplateValue | Tag | TagJsVar, contextItem: ContextItem): TagJsVar;
