import { HasValueChanged } from "../tag/Context.types.js";
import { ContextItem } from "../tag/ContextItem.type.js";
import { AnySupport } from "../tag/index.js";
import { ProcessAttribute, ProcessInit } from "../tag/ProcessInit.type.js";
import { ProcessUpdate } from "../tag/ProcessUpdate.type.js";
export type ReadOnlyVar = {
    tagJsType: string;
    processInitAttribute: ProcessAttribute;
    processInit: ProcessInit;
    processUpdate: ProcessUpdate;
    hasValueChanged: HasValueChanged;
    destroy: ProcessDelete;
};
export type TagJsVar = ReadOnlyVar & {
    isAttr?: true;
    value?: any;
    /** Optional method to check if this TagJsVar matches an injection request */
    matchesInjection?: MatchesInjection;
};
export type MatchesInjection = (inject: any, context: ContextItem) => ContextItem | void;
export type TagJsTag = TagJsVar & {
    tagJsType: string;
    processInit: ProcessInit;
    destroy: ProcessDelete;
    value?: any;
};
export type ProcessDelete = (contextItem: ContextItem, ownerSupport: AnySupport) => any;
