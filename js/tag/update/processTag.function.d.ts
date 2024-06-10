import { Tag } from '../Tag.class.js';
import { TagSubject } from '../../subject.types.js';
import { Support } from '../Support.class.js';
import { TemplaterResult } from '../TemplaterResult.class.js';
/** When first time render, adds to owner childTags */
export declare function processTag(templater: TemplaterResult, ownerSupport: Support, // owner
subject: TagSubject, // could be tag via result.tag
fragment?: DocumentFragment): Support;
export declare function tagFakeTemplater(tag: Tag): TemplaterResult;
export declare function getFakeTemplater(): TemplaterResult;
/** Create Support for a tag component */
export declare function newSupportByTemplater(templater: TemplaterResult, ownerSupport: Support, subject: TagSubject): Support;
export declare function setupNewSupport(support: Support, ownerSupport: Support, subject: TagSubject): void;
