import { TemplateValue } from './processFirstSubject.utils.js';
import { ValueSubject } from '../../subject/ValueSubject.js';
import { ContextItem } from '../Context.types.js';
import { AnySupport } from '../AnySupport.type.js';
/** Detect type and process */
export declare function processNewArrayValue(value: TemplateValue | ValueSubject<unknown>, ownerSupport: AnySupport, contextItem: ContextItem): ContextItem;
