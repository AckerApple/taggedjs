import { Clones } from "./Clones.type.js";
import { Tag } from "./Tag.class.js";
import { InterpolateOptions } from "./interpolateElement.js";
import { InterpolateComponentResult } from "./interpolateTemplate.js";
export type InterpolatedContentTemplates = {
    clones: Clones;
    tagComponents: InterpolateComponentResult[];
};
export declare function interpolateContentTemplates(element: Element, context: any, tag: Tag, options: InterpolateOptions, children: HTMLCollection): InterpolatedContentTemplates;
