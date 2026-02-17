import { ContextItem, TemplateValue } from "../../index.js";
import { LikeSubscription } from "../../TagJsTags/processSubscribeWithAttribute.function.js";
import { SubscribeValue } from '../../TagJsTags/subscribe.function.js';
import { TagJsTag } from "../../TagJsTags/TagJsTag.type.js";
export interface SubContext {
    tagJsVar?: TagJsTag<any>;
    hasEmitted?: true;
    deleted?: true;
    /** Handles each emission separately */
    subValueHandler: (value: TemplateValue, index: number) => void;
    /** Handles all emissions collectively */
    valuesHandler: (values: {
        value: TemplateValue;
        tagJsVar: TagJsTag<any>;
    }[], index: number) => void;
    lastValues: {
        value: TemplateValue;
        tagJsVar: TagJsTag<any>;
        oldTagJsVar?: TagJsTag<any>;
    }[];
    appendMarker?: Text;
    contextItem?: ContextItem;
}
export type OnSubOutput = (value: TemplateValue, syncRun: boolean, subContext: SubscriptionContext) => any;
export interface SubscriptionContext extends SubContext {
    tagJsVar: SubscribeValue;
    subscriptions: LikeSubscription[];
}
