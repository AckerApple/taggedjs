import { ContextItem } from '../ContextItem.type.js';
import { SubscribeValue } from '../../tagJsVars/subscribe.function.js';
import { AnySupport } from '../index.js';
import { OnSubOutput, SubContext } from './SubContext.type.js';
import { LikeObservable } from '../../tagJsVars/processSubscribeWithAttribute.function.js';
export declare function setupSubscribe(value: SubscribeValue, contextItem: ContextItem, ownerSupport: AnySupport, insertBeforeOriginal?: Text, // optional but will always be made
appendTo?: Element): SubContext;
/** After calling this function you need to set `contextItem.subContext = subContext` */
export declare function setupSubscribeCallbackProcessor(observables: LikeObservable<any>[], ownerSupport: AnySupport, // ownerSupport ?
onOutput: OnSubOutput, tagJsVar: SubscribeValue, contextItem: ContextItem): SubContext;
export declare function unsubscribeContext(contextItem: ContextItem): void;
export declare function deleteAndUnsubscribe(contextItem: ContextItem, ownerSupport: AnySupport): 76 | undefined;
export declare function checkToPaint(syncRun: boolean): void;
