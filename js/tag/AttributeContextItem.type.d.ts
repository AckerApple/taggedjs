import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../index.js';
import { SpecialDefinition } from '../render/attributes/Special.types.js';
import { BaseContextItem } from './ContextItem.type.js';
export interface AttributeContextItem extends BaseContextItem {
    isAttr?: true;
    howToSet?: HowToSet;
    isNameOnly?: boolean;
    attrName?: string;
    isSpecial?: SpecialDefinition;
    stateOwner?: AnySupport;
    supportOwner?: AnySupport;
}
export interface HostAttributeContextItem extends AttributeContextItem {
    state: any;
}
