import { Counts } from '../interpolations/interpolateTemplate.js';
import { AnySupport } from './Support.class.js';
import { ContextItem, Context } from './Context.types.js';
/** Function that kicks off actually putting tags down as HTML elements */
export declare function buildBeforeElement(support: AnySupport, counts: Counts, element?: Element, insertBefore?: Text): {
    context: Context;
    subs: import("../interpolations/subscribeToTemplate.function.js").SubToTemplateOptions[];
    dom: import("../interpolations/optimizers/ObjectNode.types.js").DomObjectChildren;
};
export declare function addOneContext(value: unknown, context: Context, withinOwnerElement: boolean): ContextItem;
