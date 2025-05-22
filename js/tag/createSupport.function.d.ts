import { TemplaterResult } from './getTemplaterResult.function.js';
import { ContextItem } from './ContextItem.type.js';
import { Props } from '../Props.js';
import { AnySupport } from './AnySupport.type.js';
export declare function createSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: AnySupport, subject: ContextItem, castedProps?: Props): AnySupport;
