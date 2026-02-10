import { TemplateValue } from '../tag/TemplateValue.type.js';
import { TagJsTag } from './TagJsTag.type.js';
import { TagJsComponent } from './index.js';
export declare function valueToTagJsTag(value: TemplateValue | TagJsComponent<any> | TagJsTag | unknown): TagJsTag;
