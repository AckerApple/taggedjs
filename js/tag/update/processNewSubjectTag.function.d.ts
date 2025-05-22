import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../ContextItem.type.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function processNewSubjectTag(templater: TemplaterResult, subject: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owner
counts: TagCounts, appendTo?: Element, insertBefore?: Text): AnySupport;
