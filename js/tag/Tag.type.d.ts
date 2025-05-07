import { TemplaterResult } from './getTemplaterResult.function.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { AnySupport } from './AnySupport.type.js';
import { ProcessInit } from '../subject/ProcessInit.type.js';
export type Tag = {
    values: unknown[];
    tagJsType: typeof ValueTypes.tag | typeof ValueTypes.dom;
    processInit: ProcessInit;
    templater?: TemplaterResult;
    ownerSupport?: AnySupport;
    debug?: boolean;
    /** used in array.map() */
    key: (arrayValue: unknown) => Tag;
    arrayValue?: any;
};
