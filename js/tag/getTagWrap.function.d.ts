import { TemplaterResult, Wrapper } from './getTemplaterResult.function.js';
import { TagWrapper } from './tag.utils.js';
import { AnySupport } from './getSupport.function.js';
import { Props } from '../Props.js';
/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export declare function getTagWrap(templater: TemplaterResult, result: TagWrapper<any>): Wrapper;
export declare function getCastedProps(templater: TemplaterResult, newSupport: AnySupport, lastSupport?: AnySupport): Props;
