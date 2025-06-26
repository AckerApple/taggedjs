import { AdvancedContextItem, TemplateValue } from "../../index.js";
import { SubscribeCallback } from "../../tagJsVars/subscribe.function.js";
import { LikeSubscription } from '../../tagJsVars/subscribe.function.js';
export interface SubContext {
    hasEmitted?: true;
    deleted?: true;
    /** Handles each emission separately */
    valueHandler: (value: TemplateValue, index: number) => void;
    /** Handles all emissions collectively */
    valuesHandler: (values: TemplateValue[]) => void;
    lastValues: any[];
    appendMarker?: Text;
    contextItem?: AdvancedContextItem;
}
export interface SubscriptionContext extends SubContext {
    callback?: SubscribeCallback<any>;
    subscriptions: LikeSubscription[];
}
