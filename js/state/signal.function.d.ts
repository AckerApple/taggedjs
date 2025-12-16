import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { ProcessInit } from '../tag/ProcessInit.type.js';
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js';
import { SubscribeFn } from '../tagJsVars/processSubscribeWithAttribute.function.js';
/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export declare function signal<T>(initialValue: T): SignalObject<T>;
export type SignalObject<T> = TagJsVar & {
    tagJsType: typeof ValueTypes.signal;
    value: any;
    subscribe: SubscribeFn<T>;
    processInit: ProcessInit;
    emit: (value: any) => any;
};
/** Creates object with "value" key and ability to "subscribe" to value changes */
export declare function Signal<T>(initialValue: T): SignalObject<T>;
