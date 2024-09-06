import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js';
import { ContextItem, Context } from './Context.types.js';
import { AnySupport } from './Support.class.js';
/** Function that kicks off actually putting tags down as HTML elements */
export declare function buildBeforeElement(support: AnySupport, element?: Element, insertBefore?: Text, options?: ElementBuildOptions): {
    context: Context;
    subs: import("../interpolations/subscribeToTemplate.function.js").SubToTemplateOptions[];
    dom: import("../interpolations/optimizers/ObjectNode.types.js").DomObjectChildren;
};
export declare function addOneContext(value: unknown, context: Context, withinOwnerElement: boolean): ContextItem;
