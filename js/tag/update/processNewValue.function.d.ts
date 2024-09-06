import { ContextItem } from '../Context.types.js';
import { ValueSubject } from '../../subject/ValueSubject.js';
import { AnySupport } from '../Support.class.js';
import { TemplateValue } from './processFirstSubject.utils.js';
export declare function processNewArrayValue(value: TemplateValue | ValueSubject<any>, ownerSupport: AnySupport, contextItem: ContextItem): ContextItem;
