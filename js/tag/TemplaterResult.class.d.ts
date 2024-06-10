import { Context, Tag } from './Tag.class.js';
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
export type OriginalFunction = (() => Tag) & {
    compareTo: string;
};
export type Wrapper = ((support: BaseSupport | Support, subject: TagSubject) => Support) & {
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
    clones: (Element | Text | ChildNode)[];
    callbackMaker?: true;
};
export declare class TemplaterResult {
    props: Props;
    tagJsType: string;
    tagged: boolean;
    wrapper?: Wrapper;
    madeChildIntoSubject?: boolean;
    tag?: Tag;
    children: TagChildren;
    arrayValue?: unknown;
    constructor(props: Props);
    key(arrayValue: unknown): this;
    html(strings: string[] | TemplateStringsArray, ...values: TagValues): this;
}
