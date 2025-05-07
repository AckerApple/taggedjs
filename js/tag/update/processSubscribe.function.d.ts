import { Counts } from '../../interpolations/interpolateTemplate.js';
import { ContextItem } from '../Context.types.js';
import { SubscribeValue } from '../../state/subscribe.function.js';
import { SignalObject } from '../../subject/signal.function.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function processSubscribe(value: SubscribeValue, contextItem: ContextItem, ownerSupport: AnySupport, counts: Counts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text): void;
export declare function processSignal(value: SignalObject, contextItem: ContextItem, ownerSupport: AnySupport, counts: Counts, // {added:0, removed:0}
appendTo?: Element): void;
