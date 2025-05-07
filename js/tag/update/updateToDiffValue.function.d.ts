import { SupportContextItem } from '../createHtmlSupport.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { ContextItem } from '../Context.types.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function updateToDiffValue(newValue: TemplateValue, contextItem: ContextItem | SupportContextItem, ownerSupport: AnySupport, ignoreOrDestroyed: number | boolean): void;
