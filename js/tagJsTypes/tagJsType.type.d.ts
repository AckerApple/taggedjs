import { ProcessInit } from "../tag/ProcessInit.type.js";
import { ValueTypes } from "../tag/ValueTypes.enum.js";
export type TagJsType = {
    tagJsType: typeof ValueTypes.tag | typeof ValueTypes.dom;
    processInit: ProcessInit;
    value?: any;
};
