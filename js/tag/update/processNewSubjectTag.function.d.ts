import { AnySupport } from '../getSupport.function.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../Context.types.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
export declare function processNewSubjectTag(templater: TemplaterResult, ownerSupport: AnySupport, // owner
subject: ContextItem, // could be tag via result.tag
appendTo: Element, counts: Counts): AnySupport;
