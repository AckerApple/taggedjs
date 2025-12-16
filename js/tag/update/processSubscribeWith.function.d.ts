import { SubscribeValue } from '../../tagJsVars/subscribe.function.js';
import { AnySupport } from '../index.js';
import { ContextItem } from '../ContextItem.type.js';
import { SubContext } from './SubContext.type.js';
export declare function processSubscribeWith(value: SubscribeValue, contextItem: ContextItem, ownerSupport: AnySupport, insertBefore?: Text, appendTo?: Element): SubContext;
export declare function emitSubContext(value: SubscribeValue, subContext: SubContext): void;
