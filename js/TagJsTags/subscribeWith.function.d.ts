import { ContextItem } from "../tag/index.js";
import { SubscribeValue } from "./index.js";
import { LikeObservable, SubscribeCallback } from "./processSubscribeWithAttribute.function.js";
/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export declare function subscribeWith<SubValue, DEFAULT>(Observable: LikeObservable<SubValue>, withDefault: DEFAULT, callback?: SubscribeCallback<SubValue | DEFAULT>): SubscribeValue;
/** checks is a previous tag var was a subscription but now has changed */
export declare function checkSubscribeValueChanged(value: unknown | SubscribeValue, contextItem: ContextItem): number;
