import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { ContextItem } from '../Context.types.js';
import { LikeObservable, SubscribeCallback } from '../../state/subscribe.function.js';
import { Subscription } from '../../state/subscribe.function.js';
import { StatesSetter } from '../../state/states.utils.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function setupSubscribe(observable: LikeObservable<any>, contextItem: ContextItem, ownerSupport: AnySupport, counts: Counts, callback?: SubscribeCallback<any>, appendTo?: Element, insertBefore?: Text): void;
export declare function setupSubscribeCallbackProcessor(observable: LikeObservable<any>, contextItem: ContextItem, ownerSupport: AnySupport, // ownerSupport ?
counts: Counts, // used for animation stagger computing
callback?: SubscribeCallback<any>, insertBefore?: Text): SubscribeMemory;
type SubscribeMemory = {
    hasEmitted: boolean;
    states: StatesSetter[];
    handler: (value: TemplateValue) => void;
    getLastValue: () => any;
    callback?: SubscribeCallback<any>;
    subscription: Subscription;
    contextItem: ContextItem;
};
export {};
