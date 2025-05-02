import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../getSupport.function.js';
import { ContextItem } from '../Context.types.js';
export declare function processTagComponentInit(value: any, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: Counts, // {added:0, removed:0}
appendTo?: Element): AnySupport | undefined;
