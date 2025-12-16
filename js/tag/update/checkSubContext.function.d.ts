import { AnySupport } from '../AnySupport.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { TagCounts } from '../TagCounts.type.js';
export declare function checkSubContext(newValue: TemplateValue, contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts): -1 | 99;
/** used when an variable produces a result of another sub-variable such as with subscribe()
 * - Actually might be used to tell if a main variable has changed like changing one subscribe to another
 */
export declare function handleTagTypeChangeFrom(originalType: string, newValue: TemplateValue, ownerSupport: AnySupport, contextItem: ContextItem, // NOT the subContext
counts: TagCounts): 99 | undefined;
