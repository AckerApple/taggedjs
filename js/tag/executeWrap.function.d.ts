import { TemplaterResult } from './getTemplaterResult.function.js';
import { TagWrapper } from './tag.utils.js';
import { AnySupport } from './getSupport.function.js';
import { Props } from '../Props.js';
export declare function executeWrap(templater: TemplaterResult, result: TagWrapper<unknown>, useSupport: AnySupport, castedProps?: Props): AnySupport;
