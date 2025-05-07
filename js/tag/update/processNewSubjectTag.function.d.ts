import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../Context.types.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function processNewSubjectTag(templater: TemplaterResult, subject: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owner
counts: Counts, appendTo?: Element, insertBefore?: Text): AnySupport;
