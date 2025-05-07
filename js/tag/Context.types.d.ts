import { SpecialDefinition } from '../interpolations/attributes/processAttribute.function.js';
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js';
import { InterpolateSubject, TemplateValue } from './update/processFirstSubject.utils.js';
import { Clone, TagGlobal } from './getTemplaterResult.function.js';
import { AnySupport } from './AnySupport.type.js';
import { SupportContextItem } from './createHtmlSupport.function.js';
export type ContextHandler = (value: TemplateValue, newSupport: AnySupport, contextItem: ContextItem, values: unknown[]) => void;
export type LastArrayItem = ContextItem;
export type ContextItem = {
    element?: Element;
    isAttr?: true;
    howToSet?: HowToSet;
    isNameOnly?: boolean;
    attrName?: string;
    isSpecial?: SpecialDefinition;
    placeholder?: Text;
    withinOwnerElement: boolean;
    simpleValueElm?: Clone;
    lastArray?: LastArrayItem[];
    subject?: InterpolateSubject;
    global?: TagGlobal;
    value?: any;
    /** Called on value update detected, within processUpdateOneContext(). Return value is ignored */
    handler?: ContextHandler;
    checkValueChange: CheckValueChange | CheckSupportValueChange;
    delete: (contextItem: ContextItem) => any;
};
export type CheckValueChange = (value: unknown, subject: ContextItem) => number | boolean;
export type CheckSupportValueChange = (value: unknown, subject: SupportContextItem) => number | boolean;
