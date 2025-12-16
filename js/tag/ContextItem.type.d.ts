import { Clone, TagGlobal } from './getTemplaterResult.function.js';
import { SubContext } from './update/SubContext.type.js';
import { PaintCommand } from '../render/paint.function.js';
import { Events, LastArrayItem, Subject } from '../index.js';
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js';
import { ContextStateMeta } from './ContextStateMeta.type.js';
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
export interface AppContextItem {
    /** automatically updated with every update */
    value?: any;
    /** Not updated automatically. processUpdate has the option to set this value */
    tagJsVar: TagJsVar;
    updateCount: number;
    returnValue?: any;
    state?: ContextStateMeta;
    htmlDomMeta?: DomObjectChildren;
    /** only for html`` . When -1 then its a raw bolt value */
    valueIndex: number;
    /** TODO: is this deprecated? */
    oldTagJsVar?: TagJsVar;
    subContext?: SubContext;
    withinOwnerElement: boolean;
    destroy$: Subject<void>;
    render$: Subject<void>;
    events?: Events;
}
export interface BaseContextItem extends AppContextItem {
    element?: HTMLElement;
    parentContext: BaseContextItem;
    isAttr?: true;
    isAttrs?: true;
    contexts?: ContextItem[];
}
export interface ContextItem extends BaseContextItem {
    /** number represent reason for the lock */
    locked?: number;
    deleted?: true;
    simpleValueElm?: Clone;
    paint?: PaintCommand;
    lastArray?: LastArrayItem[];
    global?: TagGlobal;
    placeholder?: Text;
}
