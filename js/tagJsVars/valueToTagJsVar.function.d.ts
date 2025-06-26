import { TemplateValue } from '../tag/TemplateValue.type.js';
import { TagJsVar } from './tagJsVar.type.js';
import { Tag } from '../tag/Tag.type.js';
export declare function valueToTagJsVar(value: TemplateValue | Tag | TagJsVar | unknown): TagJsVar;
