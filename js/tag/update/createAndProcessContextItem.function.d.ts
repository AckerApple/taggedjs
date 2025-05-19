import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { AdvancedContextItem } from '../Context.types.js';
import { AnySupport } from '../AnySupport.type.js';
/** Must provide insertBefore OR appendTo */
export declare function createAndProcessContextItem(value: TemplateValue, ownerSupport: AnySupport, counts: Counts, insertBefore?: Text, // used during updates
appendTo?: Element): AdvancedContextItem;
