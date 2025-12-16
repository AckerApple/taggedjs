import { ContextItem, Tag, TemplaterResult, AnySupport } from "..";
import { Callback } from "../interpolations/attributes/bindSubjectCallback.function";
import { Subject } from "../subject";
import { SubscribeValue } from "./subscribe.function";
export declare function processSubscribeAttributeUpdate(contextItem: ContextItem, value: string | number | boolean | Tag | SubscribeValue | TemplaterResult | (Tag | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined, ownerSupport: AnySupport, element: Element, name: string): void;
