import { TagArraySubject } from './processTagArray';
import { TemplaterResult } from '../../TemplaterResult.class';
import { Clones } from '../../interpolations/Clones.type';
import { Counts, Template } from '../../interpolations/interpolateTemplate';
import { DisplaySubject, TagSubject } from '../../subject.types';
import { ValueSubject } from '../../subject/ValueSubject';
import { RegularValue } from './processRegularValue.function';
import { Callback } from '../../interpolations/bindSubjectCallback.function';
import { Tag } from '../Tag.class';
import { Subject } from '../../subject';
export declare enum ValueTypes {
    tag = "tag",
    templater = "templater",
    tagArray = "tag-array",
    tagComponent = "tag-component",
    value = "value",
    date = "date",
    string = "string",
    boolean = "boolean",
    undefined = "undefined"
}
export declare function getValueType(value: any): ValueTypes;
export type processOptions = {
    forceElement?: boolean;
    counts: Counts;
};
export type ClonesAndPromise = {
    clones: Clones;
};
export type InterpolateSubject = (ValueSubject<undefined> | TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>) & {
    clone?: Element | Text | Template;
};
export type TemplateValue = Tag | TemplaterResult | (Tag | TemplaterResult)[] | RegularValue | Subject<any> | Callback;
