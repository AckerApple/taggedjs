import { InsertBefore } from './Clones.type';
import { DisplaySubject } from './subject.types';
export type RegularValue = string | number | undefined | boolean;
export declare function processRegularValue(value: RegularValue, subject: DisplaySubject, // could be tag via subject.tag
insertBefore: InsertBefore): void;