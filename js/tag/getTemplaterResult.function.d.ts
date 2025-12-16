import { EventCallback } from './getDomTag.function.js';
import { ContextItem } from './ContextItem.type.js';
import { AnySupport } from './index.js';
import { Props } from '../Props.js';
import { TagWrapper } from './tag.utils.js';
import { OnDestroyCallback } from '../state/onDestroy.function.js';
import { Subscription } from '../subject/subject.utils.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { PropWatches } from '../tagJsVars/tag.function.js';
import { ProcessInit } from './ProcessInit.type.js';
import { Tag } from './Tag.type.js';
import { ProcessDelete, TagJsTag } from '../tagJsVars/tagJsVar.type.js';
import { CheckSupportValueChange, HasValueChanged } from './Context.types.js';
import { ProcessUpdate } from './ProcessUpdate.type.js';
export type Wrapper = ((newSupport: AnySupport, subject: ContextItem, prevSupport?: AnySupport) => AnySupport) & TagWrapper<unknown> & {
    tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.renderOnce | typeof ValueTypes.templater;
    processInit: ProcessInit;
    processUpdate: ProcessUpdate;
    hasValueChanged: HasValueChanged | CheckSupportValueChange;
    destroy: ProcessDelete;
};
/** NOT shared across variable spots. The Subject/ContextItem is more global than this is */
export type TagGlobal = {
    deleted?: true;
    isApp?: boolean;
    subscriptions?: Subscription<unknown>[];
    destroyCallback?: OnDestroyCallback;
    callbackMaker?: true;
};
export interface SupportTagGlobal extends TagGlobal {
    blocked: AnySupport[];
}
export type Events = {
    [name: string]: EventCallback;
};
export type Clone = (Element | Text | ChildNode);
export type TemplaterResult = TagJsTag & {
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
