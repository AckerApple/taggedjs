import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { CheckSupportValueChange, CheckValueChange, ContextItem } from '../Context.types.js';
import { AnySupport } from '../AnySupport.type.js';
/** Must provide insertBefore OR appendTo */
export declare function createAndProcessContextItem(value: TemplateValue, ownerSupport: AnySupport, counts: Counts, checkValueChange: CheckValueChange | CheckSupportValueChange, insertBefore?: Text, // used during updates
appendTo?: Element): ContextItem;
