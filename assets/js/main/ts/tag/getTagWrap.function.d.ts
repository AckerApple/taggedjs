import { TemplaterResult, Wrapper } from './TemplaterResult.class';
import { TagWrapper } from './tag.utils';
/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export declare function getTagWrap(templater: TemplaterResult, result: TagWrapper<any>): Wrapper;
