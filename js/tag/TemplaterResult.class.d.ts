import { Context, Tag } from './Tag.class.js';
import { BaseTagSupport, TagSupport } from './TagSupport.class.js';
import { Props } from '../Props.js';
import { TagChildren, TagWrapper } from './tag.utils.js';
import { Provider } from '../state/providers.js';
import { OnDestroyCallback } from '../state/onDestroy.js';
import { TagSubject } from '../subject.types.js';
import { OnInitCallback } from '../state/onInit.js';
import { Subscription } from '../subject/subject.utils.js';
import { InsertBefore } from '../interpolations/InsertBefore.type.js';
import { TagValues } from './html.js';
export type OriginalFunction = (() => Tag) & {
    compareTo: string;
};
export type Wrapper = ((tagSupport: BaseTagSupport, subject: TagSubject) => TagSupport) & {
    parentWrap: TagWrapper<any>;
};
export type TagGlobal = {
    oldest?: TagSupport;
    newest?: TagSupport;
    context: Context;
    providers: Provider[];
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number;
    deleted: boolean;
    isApp?: boolean;
    insertBefore?: InsertBefore;
    placeholder?: Text;
    subscriptions: Subscription<any>[];
    destroyCallback?: OnDestroyCallback;
    init?: OnInitCallback;
};
export declare class TemplaterResult {
    props: Props;
    tagJsType: string;
    tagged: boolean;
    wrapper?: Wrapper;
    madeChildIntoSubject?: boolean;
    tag?: Tag;
    children: TagChildren;
    constructor(props: Props);
    html(strings: string[] | TemplateStringsArray, ...values: TagValues): this;
}
