import { TemplaterResult } from '../getTemplaterResult.function.js';
import { AnySupport } from '../AnySupport.type.js';
import { TagCounts } from '../TagCounts.type.js';
import { SupportContextItem } from '../SupportContextItem.type.js';
export declare function processReplacementComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, counts: TagCounts): AnySupport;
export declare function processFirstSubjectComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, counts: TagCounts, appendTo: Element): AnySupport;
