import { TemplaterResult } from '../getTemplaterResult.function.js';
import { AnySupport, ContextItem } from '../index.js';
import { SupportContextItem } from '../SupportContextItem.type.js';
import { Subject, SubscribeValue, Tag } from '../../index.js';
import { Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js';
export declare function processReplacementComponent(templater: TemplaterResult, context: SupportContextItem, ownerSupport?: AnySupport): AnySupport;
export declare function makeRealUpdate(newContext: ContextItem, value: string | number | boolean | Tag | SubscribeValue | TemplaterResult | (Tag | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined, context: SupportContextItem, convertValue: any, support: AnySupport): void;
export declare function afterDestroy(context: ContextItem & SupportContextItem, _ownerSupport: AnySupport): void;
export declare function processFirstSubjectComponent(templater: TemplaterResult, subject: SupportContextItem, ownerSupport: AnySupport, appendTo: Element): AnySupport;
