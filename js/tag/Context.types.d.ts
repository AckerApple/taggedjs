import { SpecialDefinition } from '../interpolations/attributes/processAttribute.function.js';
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js';
import { InterpolateSubject } from './update/processFirstSubject.utils.js';
import { Clone, TagGlobal } from './getTemplaterResult.function.js';
import { AnySupport, SupportContextItem } from './getSupport.function.js';
export type ContextHandler = (value: unknown, values: unknown[], newSupport: AnySupport, contextItem: ContextItem) => void;
export type LastArrayItem = {
    context: ContextItem;
    global: TagGlobal;
};
export type ContextItem = {
    element?: Element;
    handler?: ContextHandler;
    isAttr?: true;
    howToSet?: HowToSet;
    isNameOnly?: boolean;
    attrName?: string;
    isSpecial?: SpecialDefinition;
    placeholder?: Text;
    simpleValueElm?: Clone;
    lastArray?: LastArrayItem[];
    subject?: InterpolateSubject;
    global?: TagGlobal;
    value?: any;
    withinOwnerElement: boolean;
    checkValueChange: CheckValueChange | CheckSupportValueChange;
};
export type CheckValueChange = (value: unknown, subject: ContextItem) => number | boolean;
export type CheckSupportValueChange = (value: unknown, subject: SupportContextItem) => number | boolean;
