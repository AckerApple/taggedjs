import { SupportContextItem } from '../SupportContextItem.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { TemplateValue } from '../index.js';
import { AnySupport } from '../index.js';
export declare function updateToDiffValue(newValue: TemplateValue, context: ContextItem | SupportContextItem, ownerSupport: AnySupport, ignoreOrDestroyed: number | boolean): void;
