import { TemplaterResult } from '../TemplaterResult.class.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport, SupportContextItem } from '../Support.class.js';
export declare function processReplacementComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, counts: Counts): AnySupport;
export declare function processFirstSubjectComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, counts: Counts, appendTo: Element): AnySupport;
