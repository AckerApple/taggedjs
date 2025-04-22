import { TemplaterResult } from './getTemplaterResult.function.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { AnySupport } from './getSupport.function.js';
export type Tag = {
    values: unknown[];
    tagJsType?: typeof ValueTypes.tag | typeof ValueTypes.dom;
    templater?: TemplaterResult;
    ownerSupport?: AnySupport;
    debug?: boolean;
    /** used in array.map() */
    key: (arrayValue: unknown) => Tag;
    arrayValue?: any;
};
