import { EventCallback } from './getDomTag.function.js';
import { ContextItem } from './ContextItem.type.js';
import { AnySupport } from './AnySupport.type.js';
import { SupportContextItem } from './SupportContextItem.type.js';
import { Props } from '../Props.js';
import { TagWrapper } from './tag.utils.js';
import { Provider } from '../state/providers.js';
import { OnDestroyCallback } from '../state/onDestroy.js';
import { Subscription } from '../subject/subject.utils.js';
import { Subject } from '../subject/index.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
import { PropWatches } from '../tagJsVars/tag.function.js';
import { ProcessInit } from './ProcessInit.type.js';
import { Tag } from './Tag.type.js';
import { ProcessDelete, TagJsVar } from '../tagJsVars/tagJsVar.type.js';
import { CheckSupportValueChange, CheckValueChange } from './Context.types.js';
export type Wrapper = ((newSupport: AnySupport, subject: ContextItem, prevSupport?: AnySupport) => AnySupport) & TagWrapper<unknown> & {
    tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.renderOnce | typeof ValueTypes.templater;
    processInit: ProcessInit;
    checkValueChange: CheckValueChange | CheckSupportValueChange;
    delete: ProcessDelete;
};
/** NOT shared across variable spots. The Subject/ContextItem is more global than this is */
export type TagGlobal = {
    htmlDomMeta?: DomObjectChildren;
    deleted?: true;
    isApp?: boolean;
    subscriptions?: Subscription<unknown>[];
    destroyCallback?: OnDestroyCallback;
    locked?: true;
    callbackMaker?: true;
    destroys?: (() => any)[];
};
export type SupportTagGlobal = TagGlobal & {
    destroy$: Subject<void>;
    blocked: AnySupport[];
    oldest: AnySupport;
    newest: AnySupport;
    context: SupportContextItem[];
    providers?: Provider[];
};
export type BaseTagGlobal = SupportTagGlobal & {
    events?: Events;
};
export type Events = {
    [name: string]: EventCallback;
};
export type Clone = (Element | Text | ChildNode);
export type TemplaterResult = TagJsVar & {
    tagJsType: string;
    processInit: ProcessInit;
    propWatch: PropWatches;
    wrapper?: Wrapper;
    tag?: Tag;
    props?: Props;
    /** Used inside of an array.map() function */
    key: <T>(arrayValue: T) => TemplaterResultArrayItem<T>;
};
export type TemplaterResultArrayItem<T> = TemplaterResult & {
    arrayValue?: T;
};
export declare function getTemplaterResult(propWatch: PropWatches, props?: Props): TemplaterResult;
