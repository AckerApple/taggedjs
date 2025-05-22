import type { TagCounts } from '../TagCounts.type.js';
import { AdvancedContextItem } from '../AdvancedContextItem.type.js';
import { LikeObservable, SubscribeCallback } from '../../tagJsVars/subscribe.function.js';
import { AnySupport } from '../AnySupport.type.js';
import { SubContext } from './SubContext.type.js';
import { ContextItem } from '../ContextItem.type.js';
export declare function setupSubscribe(observable: LikeObservable<any>, contextItem: AdvancedContextItem, ownerSupport: AnySupport, counts: TagCounts, callback?: SubscribeCallback<any>, appendTo?: Element, insertBeforeOriginal?: Text): SubContext;
export declare function setupSubscribeCallbackProcessor(observable: LikeObservable<any>, ownerSupport: AnySupport, // ownerSupport ?
counts: TagCounts, // used for animation stagger computing
insertBefore: Text, callback?: SubscribeCallback<any>): SubContext;
export declare function deleteAndUnsubscribe(contextItem: ContextItem, ownerSupport: AnySupport): 77 | undefined;
