import { TemplaterResult } from './TemplaterResult.class.js';
import { ContextItem } from './Context.types.js';
import { Props } from '../Props.js';
import { AnySupport } from './Support.class.js';
export declare function getSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: AnySupport, subject: ContextItem, castedProps?: Props): AnySupport;
