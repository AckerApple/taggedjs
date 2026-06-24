import { ValueTypes } from "../tag/index.js";
import { TagJsTag } from "./TagJsTag.type.js";
import { OnSubOutput } from "../tag/update/SubContext.type.js";
import { LikeObservable, SubscribeCallback } from "./processSubscribeWithAttribute.function.js";
import { subscribeAll } from "./subscribeAll.function.js";
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export declare function subscribe<T>(Observable: LikeObservable<T>, callback?: SubscribeCallback<T>): SubscribeValue;
export declare namespace subscribe {
    var all: typeof subscribeAll;
}
export type SubscribeValue = TagJsTag<any> & {
    tagJsType: typeof ValueTypes.subscribe;
    withDefault?: any;
    callback?: SubscribeCallback<any>;
    onOutput: OnSubOutput;
    Observables: LikeObservable<any>[];
};
