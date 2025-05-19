import { SupportContextItem } from '../../tag/createHtmlSupport.function.js';
import { TemplaterResult } from '../../tag/getTemplaterResult.function.js';
import type { StringTag } from '../../tag/StringTag.type.js';
import type { DomTag } from '../../tag/DomTag.type.js';
import { ContextItem } from '../../tag/Context.types.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
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
