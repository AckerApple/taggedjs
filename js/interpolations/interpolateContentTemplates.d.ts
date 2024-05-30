import { Clones } from './Clones.type.js';
import { TagSupport } from '../tag/TagSupport.class.js';
import { InterpolateOptions } from './interpolateElement.js';
import { InterpolateComponentResult } from './interpolateTemplate.js';
export type InterpolatedContentTemplates = {
    clones: Clones;
    tagComponents: InterpolateComponentResult[];
};
export declare function interpolateContentTemplates(context: any, tagSupport: TagSupport, options: InterpolateOptions, children: HTMLCollection): InterpolatedContentTemplates;
