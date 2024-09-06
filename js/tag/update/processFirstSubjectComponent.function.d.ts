import { TemplaterResult } from '../TemplaterResult.class.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { BaseSupport, Support } from '../Support.class.js';
import { ContextItem } from '../Context.types.js';
export declare function processReplacementComponent(templater: TemplaterResult, subject: ContextItem, ownerSupport: BaseSupport | Support, counts: Counts): BaseSupport | Support;
export declare function processFirstSubjectComponent(templater: TemplaterResult, subject: ContextItem, ownerSupport: BaseSupport | Support, counts: Counts, appendTo: Element): BaseSupport | Support;
