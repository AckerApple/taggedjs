import { LikeObservable, SubscribeCallback, SubscribeValue } from "../tagJsVars/subscribe.function.js";
/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export declare function subscribeWith<SubValue, DEFAULT>(Observable: LikeObservable<SubValue>, withDefault: DEFAULT, callback?: SubscribeCallback<SubValue | DEFAULT>): SubscribeValue;
