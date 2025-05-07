import { SupportContextItem } from '../createHtmlSupport.function.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import type { StringTag } from '../StringTag.type.js';
import type { DomTag } from '../DomTag.type.js';
import { ContextItem } from '../Context.types.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../AnySupport.type.js';
/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export declare function processTag(ownerSupport: AnySupport, // owner
subject: SupportContextItem, // could be tag via result.tag
counts: Counts): AnySupport;
export declare function tagFakeTemplater(tag: StringTag | DomTag): TemplaterResult;
export declare function getFakeTemplater(): TemplaterResult;
/** Create support for a tag component */
export declare function newSupportByTemplater(templater: TemplaterResult, ownerSupport: AnySupport, subject: ContextItem): AnySupport;
