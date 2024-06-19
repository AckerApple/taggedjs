import { State } from '../state/index.js';
import { InterpolatedTemplates } from '../interpolations/interpolations.js';
import { TemplaterResult } from './TemplaterResult.class.js';
import { TagValues } from './html.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { TagJsSubject } from './update/TagJsSubject.class.js';
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
export declare const variablePrefix = ":tagvar";
export declare const variableSuffix = ":";
export declare const escapeVariable: string;
export declare const escapeSearch: RegExp;
export type Context = TagJsSubject<any>[];
export type TagMemory = {
    state: State;
};
export interface TagTemplate {
    interpolation: InterpolatedTemplates;
    string: string;
    strings: string[];
    values: unknown[];
    domMeta?: ObjectChildren;
}
export declare class BaseTag {
    values: unknown[];
    tagJsType?: string;
    arrayValue?: unknown;
    templater: TemplaterResult;
    constructor(values: unknown[]);
    /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
    key(arrayValue: unknown): this;
}
export declare class Tag extends BaseTag {
    strings: string[];
    values: unknown[];
    tagJsType: ValueTypes;
    children?: {
        strings: string[] | TemplateStringsArray;
        values: TagValues;
    };
    constructor(strings: string[], values: unknown[]);
    html(strings: string[] | TemplateStringsArray, ...values: TagValues): this;
}
export declare class Dom extends BaseTag {
    dom: ObjectChildren;
    values: unknown[];
    tagJsType: ValueTypes;
    children?: {
        dom: ObjectChildren;
        values: TagValues;
    };
    constructor(dom: ObjectChildren, values: unknown[]);
    html: {
        dom: (dom: ObjectChildren, ...values: TagValues) => Dom;
    };
}
