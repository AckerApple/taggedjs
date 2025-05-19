import { Subscription } from '../subject/subject.utils.js';
import { AnySupport } from './AnySupport.type.js';
import { ContextItem } from './Context.types.js';
export declare function destroyContext(childTags: ContextItem[], ownerSupport: AnySupport): void;
export declare function getChildTagsToSoftDestroy(childTags: ContextItem[], tags?: AnySupport[], subs?: Subscription<any>[]): {
    subs: Subscription<any>[];
    tags: AnySupport[];
};
export declare function unsubscribeFrom(from: any): void;
