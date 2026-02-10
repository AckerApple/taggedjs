import { TemplateValue } from '../tag/TemplateValue.type.js';
import { TagJsVar } from './tagJsVar.type.js';
import { TagJsComponent } from './index.js';
export declare function valueToTagJsVar(value: TemplateValue | TagJsComponent<any> | TagJsVar | unknown): TagJsVar;
