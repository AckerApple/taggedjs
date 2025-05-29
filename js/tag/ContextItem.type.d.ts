import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js';
import { Clone, TagGlobal } from './getTemplaterResult.function.js';
import { SubContext } from './update/SubContext.type.js';
import { PaintCommand } from '../render/paint.function.js';
import { ContextHandler, LastArrayItem } from '../index.js';
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js';
import { SpecialDefinition } from '../render/attributes/Special.types.js';
export interface ContextItem {
    element?: Element;
    /** handler(value,newSupport,contextItem,values) Called on value update detected, within processUpdateOneContext(). Return value is ignored */
    handler?: ContextHandler;
    isAttr?: true;
    howToSet?: HowToSet;
    isNameOnly?: boolean;
    attrName?: string;
    isSpecial?: SpecialDefinition;
    simpleValueElm?: Clone;
    paint?: PaintCommand;
    lastArray?: LastArrayItem[];
    subContext?: SubContext;
    value?: any;
    tagJsVar?: TagJsVar;
    global?: TagGlobal;
    placeholder?: Text;
    withinOwnerElement: boolean;
}
