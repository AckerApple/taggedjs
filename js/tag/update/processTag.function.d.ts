import { InsertBefore } from '../../interpolations/Clones.type.js';
import { Tag } from '../Tag.class.js';
import { TagSubject } from '../../subject.types.js';
import { TagSupport } from '../TagSupport.class.js';
import { TemplaterResult } from '../TemplaterResult.class.js';
/** Could be a regular tag or a component. Both are Tag.class */
export declare function processTag(templater: TemplaterResult, insertBefore: InsertBefore, ownerSupport: TagSupport, // owner
subject: TagSubject): void;
export declare function tagFakeTemplater(tag: Tag): TemplaterResult;
export declare function getFakeTemplater(): TemplaterResult;
export declare function newTagSupportByTemplater(templater: TemplaterResult, ownerSupport: TagSupport, subject: TagSubject): TagSupport;
export declare function setupNewTemplater(tagSupport: TagSupport, ownerSupport: TagSupport, subject: TagSubject): void;
