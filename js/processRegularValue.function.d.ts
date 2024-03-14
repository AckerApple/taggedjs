import { DisplaySubject } from './Tag.utils';
import { Template } from './interpolateTemplate';
export type RegularValue = string | number | undefined | boolean;
export declare function processRegularValue(value: RegularValue, result: DisplaySubject, // could be tag via result.tag
template: Element | Text | Template): never[];
