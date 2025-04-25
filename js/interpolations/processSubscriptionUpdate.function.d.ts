import { TemplateValue } from '../tag/update/processFirstSubject.utils.js';
import { ContextItem } from '../tag/Context.types.js';
import { AnySupport } from '../tag/getSupport.function.js';
/** Used for values that are to subscribe to */
export declare function processSubUpdate(value: TemplateValue, // Observable | Subject
contextItem: ContextItem, support: AnySupport): void;
