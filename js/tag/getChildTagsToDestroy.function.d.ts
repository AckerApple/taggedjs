import { Subscription } from '../subject/subject.utils.js';
import { AnySupport } from './getSupport.function.js';
import { ContextItem } from './Context.types.js';
export declare function getChildTagsToDestroy(childTags: ContextItem[]): void;
export declare function getChildTagsToSoftDestroy(childTags: ContextItem[], tags?: AnySupport[], subs?: Subscription<any>[]): {
    subs: Subscription<any>[];
    tags: AnySupport[];
};
