import { AnySupport } from '../index.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
/** used to handle when value was subscribe but now is something else */
export declare function handleTagTypeChangeFrom(originalType: string, newValue: TemplateValue, ownerSupport: AnySupport, contextItem: ContextItem): 99 | undefined;
