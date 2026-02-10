import { Clone, TagGlobal } from './getTemplaterResult.function.js';
import { SubContext } from './update/SubContext.type.js';
import { PaintCommand } from '../render/paint.function.js';
import { Events, LastArrayItem, Subject } from '../index.js';
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js';
import { ContextStateMeta } from './ContextStateMeta.type.js';
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
export interface AppContextItem {
    /** automatically updated with every update */
    value?: any;
    /** Not updated automatically. processUpdate has the option to set this value */
    tagJsVar: TagJsTag;
    updateCount: number;
    returnValue?: any;
    state?: ContextStateMeta;
    htmlDomMeta?: DomObjectChildren;
    /** only for html`` . When -1 then its a raw bolt value */
    valueIndex: number;
    /** TODO: is this deprecated? */
    oldTagJsVar?: TagJsTag;
    subContext?: SubContext;
    withinOwnerElement: boolean;
    destroy$: Subject<void>;
    /** emits during update cycle (before paint() flush) so tag.onRender/watch hooks can run */
    render$: Subject<void>;
    events?: Events;
}
export interface BaseContextItem extends AppContextItem {
    target?: HTMLElement;
    parentContext: BaseContextItem;
    isAttr?: true;
    isAttrs?: true;
    contexts?: ContextItem[];
    /** Argument aka Prop updates */
    inputsHandler?: (...args: any[]) => any;
    /** Argument aka Prop updates */
    updatesHandler?: (...args: any[]) => any;
}
export interface ContextItem extends BaseContextItem {
    /** number represent reason for the lock */
    locked?: number;
    deleted?: true;
    simpleValueElm?: Clone;
    /** pending paint command for simple/regular values before the DOM node is committed */
    paint?: PaintCommand;
    lastArray?: LastArrayItem[];
    arrayValue?: any;
    global?: TagGlobal;
    placeholder?: Text;
}
export type ElementContext = ContextItem & {
    /** paint commands queued for this context's element work */
    paintCommands?: PaintCommand[];
};
