import { ContextItem, Tag, TemplaterResult, AnySupport } from "..";
import { Callback } from "../interpolations/attributes/bindSubjectCallback.function.js";
import { Subject } from "../subject/index.js";
import { SubscribeValue } from "./subscribe.function.js";
export declare function processSubscribeAttributeUpdate(contextItem: ContextItem, value: string | number | boolean | Tag | SubscribeValue | TemplaterResult | (Tag | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined, ownerSupport: AnySupport, element: Element, name: string): void;
