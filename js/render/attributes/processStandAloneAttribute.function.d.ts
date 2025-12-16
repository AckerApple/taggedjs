import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/index.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { HostValue } from '../../tagJsVars/host.function.js';
export declare function processStandAloneAttribute(values: unknown[], attrValue: string | boolean | Record<string, any> | HostValue, element: HTMLElement, ownerSupport: AnySupport, howToSet: HowToSet, contexts: ContextItem[], parentContext: ContextItem): ContextItem[] | void;
