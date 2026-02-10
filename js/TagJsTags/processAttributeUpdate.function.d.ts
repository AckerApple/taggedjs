import { ContextItem, TemplaterResult, AnySupport, HowToSet, TagJsComponent } from "../index.js";
import { Callback } from "../interpolations/attributes/bindSubjectCallback.function.js";
import { Subject } from "../subject/index.js";
import { SubscribeValue } from "./subscribe.function.js";
export declare function processAttributeUpdate(value: string | number | boolean | null | TagJsComponent<any> | SubscribeValue | TemplaterResult | (TagJsComponent<any> | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined, contextItem: ContextItem, ownerSupport: AnySupport, element: Element, name: string, howToSet: HowToSet): void;
