import { SupportContextItem } from '../SupportContextItem.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { TemplateValue } from '../index.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function updateToDiffValue(newValue: TemplateValue, contextItem: ContextItem | SupportContextItem, ownerSupport: AnySupport, ignoreOrDestroyed: number | boolean): void;
