import { AnySupport } from "../tag/AnySupport.type.js";
import { TagJsVar } from "./tagJsVar.type.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { SubContext } from "../tag/update/SubContext.type.js";
import { SubscribeValue } from "./index.js";
export type LikeSubscription = {
    unsubscribe: () => any;
};
export type Subscriber<T> = (arg: T) => any;
export type SubscribeFn<T> = (callback: Subscriber<T>) => (LikeSubscription);
export type LikeObservable<T> = {
    subscribe: SubscribeFn<T>;
};
export type SubscribeCallback<T> = (data: T) => any;
export declare function processSubscribeWithAttribute(name: string, value: SubscribeValue, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element: HTMLElement, _tagJsVar: TagJsVar, // its the same as the value
contextItem: AttributeContextItem, ownerSupport: AnySupport): void;
export declare function emitSubScriptionAsIs(value: SubscribeValue, subContext: SubContext): void;
