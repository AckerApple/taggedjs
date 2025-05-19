import { SpecialDefinition } from '../render/attributes/processAttribute.function.js';
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js';
import { TemplateValue } from './update/processFirstSubject.utils.js';
import { Clone, TagGlobal } from './getTemplaterResult.function.js';
import { AnySupport } from './AnySupport.type.js';
import { SupportContextItem } from './createHtmlSupport.function.js';
import { SubscribeMemory } from './update/setupSubscribe.function.js';
import { PaintCommand } from '../render/paint.function.js';
export type ContextHandler = (value: TemplateValue, newSupport: AnySupport, contextItem: ContextItem, values: unknown[]) => void;
export type LastArrayItem = ContextItem;
export interface ContextItem {
    element?: Element;
    /** Called on value update detected, within processUpdateOneContext(). Return value is ignored */
    handler?: ContextHandler;
    checkValueChange?: CheckValueChange | CheckSupportValueChange;
    delete?: (contextItem: ContextItem, ownerSupport: AnySupport) => any;
    isAttr?: true;
    howToSet?: HowToSet;
    isNameOnly?: boolean;
    attrName?: string;
    isSpecial?: SpecialDefinition;
    simpleValueElm?: Clone;
    paint?: PaintCommand;
    lastArray?: LastArrayItem[];
    subscription?: SubscribeMemory;
    value?: any;
    global?: TagGlobal;
    placeholder?: Text;
    withinOwnerElement: boolean;
}
export interface AdvancedContextItem extends ContextItem {
    handler?: ContextHandler;
    checkValueChange: CheckValueChange | CheckSupportValueChange;
    delete: (contextItem: ContextItem, ownerSupport: AnySupport) => any;
}
export type CheckValueChange = (value: unknown, subject: ContextItem) => number | boolean;
export type CheckSupportValueChange = (value: unknown, subject: SupportContextItem) => number | boolean;
