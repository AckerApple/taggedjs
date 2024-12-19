import { Subscription } from '../subject/subject.utils.js';
import { AnySupport } from './getSupport.function.js';
import { Context } from './Context.types.js';
export declare function getChildTagsToDestroy(childTags: Context): void;
export declare function getChildTagsToSoftDestroy(childTags: Context, tags?: AnySupport[], subs?: Subscription<any>[]): {
    subs: Subscription<any>[];
    tags: AnySupport[];
};
