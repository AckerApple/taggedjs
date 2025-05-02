import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../getSupport.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { ContextItem } from '../Context.types.js';
import { LikeObservable, SubscribeCallback } from '../../state/subscribe.function.js';
import { Subscription } from '../../state/subscribe.function.js';
import { StatesSetter } from '../../state/states.utils.js';
export declare function setupSubscribe(observable: LikeObservable<any>, contextItem: ContextItem, ownerSupport: AnySupport, counts: Counts, callback?: SubscribeCallback<any>, appendTo?: Element | undefined): void;
export declare function setupSubscribeCallbackProcessor(observable: LikeObservable<any>, contextItem: ContextItem, support: AnySupport, // ownerSupport ?
counts: Counts, // used for animation stagger computing
callback?: SubscribeCallback<any>, appendTo?: Element): {
    hasEmitted: boolean;
    states: StatesSetter[];
    handler: (value: TemplateValue) => void;
    getLastValue: () => TemplateValue;
    callback: typeof callback;
    subscription: Subscription;
};
