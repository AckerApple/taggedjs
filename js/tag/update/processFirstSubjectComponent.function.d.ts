import { TemplaterResult } from '../getTemplaterResult.function.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { SupportContextItem } from '../createHtmlSupport.function.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function processReplacementComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, counts: Counts): AnySupport;
export declare function processFirstSubjectComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, counts: Counts, appendTo: Element): AnySupport;
