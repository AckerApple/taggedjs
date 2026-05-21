import type { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import type { TagJsComponent } from '../TagJsTags/tag.function.js';
import { ElementVarBase } from './ElementVarBase.type.js';
type HtmlStringValue = ElementVarBase | TemplaterResult | TagJsComponent<any>;
export declare function elementVarToHtmlString(element: HtmlStringValue): string;
export {};
