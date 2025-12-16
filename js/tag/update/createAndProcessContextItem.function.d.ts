import { AnySupport } from '../index.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
/** Used by arrays and subcontext creators like subscribe. Must provide insertBefore OR appendTo */
export declare function createAndProcessContextItem(value: TemplateValue, ownerSupport: AnySupport, contexts: ContextItem[], insertBefore?: Text, // used during updates
appendTo?: Element): ContextItem;
