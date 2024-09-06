import { TemplaterResult } from '../TemplaterResult.class.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { BaseSupport, Support } from '../Support.class.js';
import { ContextItem } from '../Tag.class.js';
export declare function processFirstSubjectComponent(templater: TemplaterResult, subject: ContextItem, ownerSupport: BaseSupport | Support, options: {
    counts: Counts;
}): BaseSupport | Support;
