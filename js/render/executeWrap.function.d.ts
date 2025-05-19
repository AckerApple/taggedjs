import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { TagWrapper } from '../tag/tag.utils.js';
import { AnySupport } from '../tag/AnySupport.type.js';
import { Props } from '../Props.js';
export declare function executeWrap(templater: TemplaterResult, result: TagWrapper<unknown>, useSupport: AnySupport, castedProps?: Props): AnySupport;
