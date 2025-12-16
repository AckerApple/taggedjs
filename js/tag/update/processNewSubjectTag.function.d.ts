import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
export declare function processNewSubjectTag(templater: TemplaterResult, subject: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owner
appendTo?: Element, insertBefore?: Text): AnySupport;
