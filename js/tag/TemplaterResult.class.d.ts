import { Context, Tag, Dom } from './Tag.class.js';
import { BaseSupport, Support } from './Support.class.js';
import { Props } from '../Props.js';
import { TagChildren, TagWrapper } from './tag.utils.js';
import { Provider } from '../state/providers.js';
import { OnDestroyCallback } from '../state/onDestroy.js';
import { TagSubject } from '../subject.types.js';
import { OnInitCallback } from '../state/onInit.js';
import { Subscription } from '../subject/subject.utils.js';
import { InsertBefore } from '../interpolations/InsertBefore.type.js';
import { TagValues } from './html.js';
import { Subject } from '../subject/index.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
export type OriginalFunction = (() => Tag) & {
    compareTo: string;
};
export type Wrapper = ((newSupport: BaseSupport | Support, subject: TagSubject, prevSupport?: BaseSupport | Support) => Support) & {
    parentWrap: TagWrapper<any>;
};
export type TagGlobal = {
    destroy$: Subject<any>;
    oldest: BaseSupport | Support;
    newest?: BaseSupport | Support;
    context: Context;
    providers: Provider[];
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number;
    deleted?: true;
    isApp?: boolean;
    insertBefore?: InsertBefore;
    placeholder?: Text;
    subscriptions: Subscription<any>[];
    destroyCallback?: OnDestroyCallback;
    init?: OnInitCallback;
    locked?: true;
    blocked: (BaseSupport | Support)[];
    childTags: Support[];
    clones: Clone[];
    callbackMaker?: true;
};
export type Clone = (Element | Text | ChildNode);
export declare class TemplaterResult {
    props: Props;
    tagJsType: ValueTypes;
    tagged: boolean;
    wrapper?: Wrapper;
    madeChildIntoSubject?: boolean;
    tag?: Tag | Dom;
    children: TagChildren;
    arrayValue?: unknown;
    constructor(props: Props);
    key(arrayValue: unknown): this;
    /** children */
    html(strings: string[] | TemplateStringsArray, ...values: TagValues): this;
    /** children */
    dom(strings: ObjectChildren, ...values: TagValues): this;
}
