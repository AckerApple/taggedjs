import { TemplaterResult } from './getTemplaterResult.function.js';
import { ContextItem } from './ContextItem.type.js';
import { Props } from '../Props.js';
import { AnySupport } from './index.js';
export declare function createSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
subject: ContextItem, ownerSupport?: AnySupport, // when not
appSupport?: AnySupport, castedProps?: Props): AnySupport;
