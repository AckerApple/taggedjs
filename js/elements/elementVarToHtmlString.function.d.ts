import type { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import type { TagJsComponent } from '../TagJsTags/tag.function.js';
import { ElementVarBase } from './ElementVarBase.type.js';
type ElementLike = Pick<ElementVarBase, 'tagName' | 'innerHTML' | 'attributes'>;
type HtmlStringValue = ElementVarBase | TemplaterResult | TagJsComponent<any>;
export declare function elementVarToHtmlString(element: HtmlStringValue): string;
export declare function directRenderElement(element: ElementLike): string;
export declare function elementToString(value: any): string;
export {};
