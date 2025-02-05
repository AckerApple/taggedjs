import { StringTag, DomTag, EventCallback } from './getDomTag.function.js';
import { ContextItem } from './Context.types.js';
import { AnySupport, SupportContextItem } from './getSupport.function.js';
import { Props } from '../Props.js';
import { TagWrapper } from './tag.utils.js';
import { Provider } from '../state/providers.js';
import { OnDestroyCallback } from '../state/onDestroy.js';
import { Subscription } from '../subject/subject.utils.js';
import { Subject } from '../subject/index.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
import { PropWatches } from './tag.js';
export type Wrapper = ((newSupport: AnySupport, subject: ContextItem, prevSupport?: AnySupport) => AnySupport) & TagWrapper<unknown> & {
    tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.renderOnce | typeof ValueTypes.templater;
};
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
export type TemplaterResult = {
    propWatch: PropWatches;
    tagJsType: string;
    wrapper?: Wrapper;
    tag?: StringTag | DomTag;
    props?: Props;
    arrayValue?: unknown;
    key: (arrayValue: unknown) => TemplaterResult;
};
export declare function getTemplaterResult(propWatch: PropWatches, props?: Props): TemplaterResult;
