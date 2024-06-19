import { Tag, Dom } from '../Tag.class.js';
import { TagJsSubject } from './TagJsSubject.class.js';
import { TagSubject } from '../../subject.types.js';
import { AnySupport, BaseSupport, Support } from '../Support.class.js';
import { TemplaterResult } from '../TemplaterResult.class.js';
/** When first time render, adds to owner childTags */
export declare function processTag(templater: TemplaterResult, ownerSupport: AnySupport, // owner
subject: TagSubject): Support;
export declare function tagFakeTemplater(tag: Tag | Dom): TemplaterResult;
export declare function getFakeTemplater(): TemplaterResult;
/** Create Support for a tag component */
export declare function newSupportByTemplater(templater: TemplaterResult, ownerSupport: BaseSupport | Support, subject: TagSubject): Support;
export declare function setupNewSupport(support: Support, ownerSupport: BaseSupport | Support, subject: TagSubject): void;
export declare function afterChildrenBuilt(children: Element[], subject: TagJsSubject<any>, ownerSupport: AnySupport): void;
