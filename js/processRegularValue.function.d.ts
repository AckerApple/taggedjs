import { Clones } from "./Clones.type";
import { Tag } from "./Tag.class";
import { DisplaySubject } from "./Tag.utils";
import { Template } from "./interpolateTemplate.js";
export declare function processRegularValue(value: any, result: DisplaySubject, // could be tag via result.tag
template: Template, // <template end interpolate /> (will be removed)
ownerTag: Tag): Clones;
