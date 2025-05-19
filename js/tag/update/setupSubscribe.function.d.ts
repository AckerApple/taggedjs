import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { AdvancedContextItem } from '../Context.types.js';
import { LikeObservable, SubscribeCallback } from '../../state/subscribe.function.js';
import { Subscription } from '../../state/subscribe.function.js';
import { StatesSetter } from '../../state/states.utils.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function setupSubscribe(observable: LikeObservable<any>, contextItem: AdvancedContextItem, ownerSupport: AnySupport, counts: Counts, callback?: SubscribeCallback<any>, appendTo?: Element, insertBefore?: Text): SubscribeMemory;
export declare function setupSubscribeCallbackProcessor(observable: LikeObservable<any>, ownerSupport: AnySupport, // ownerSupport ?
counts: Counts, // used for animation stagger computing
callback?: SubscribeCallback<any>, insertBefore?: Text): SubscribeMemory;
export type SubscribeMemory = {
    hasEmitted: boolean;
    deleted: boolean;
    states: StatesSetter[];
    /** Handles emissions from subject and figures out what to display */
    handler: (value: TemplateValue) => void;
    lastValue: any;
    callback?: SubscribeCallback<any>;
    subscription: Subscription;
    appendMarker?: Text;
    contextItem: AdvancedContextItem;
};
