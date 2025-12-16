import type { TagCounts } from '../../tag/TagCounts.type.js';
import { SubscribeValue } from '../../tagJsVars/subscribe.function.js';
import { SignalObject } from '../../state/signal.function.js';
import { AnySupport } from '../AnySupport.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { SubContext } from './SubContext.type.js';
export declare function processSubscribeWith(value: SubscribeValue, contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts, appendTo?: Element, insertBefore?: Text): SubContext;
export declare function emitSubContext(value: SubscribeValue, subContext: SubContext): void;
export declare function processSignal(value: SignalObject<any>, contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts, appendTo?: Element): void;
