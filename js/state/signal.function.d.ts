import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { ProcessInit } from '../tag/ProcessInit.type.js';
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js';
import { SubscribeFn } from '../TagJsTags/processSubscribeWithAttribute.function.js';
/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export declare function signal<T>(initialValue: T): SignalObject<T>;
export type SignalObject<T> = TagJsTag & {
    tagJsType: typeof ValueTypes.signal;
    value: any;
    subscribe: SubscribeFn<T>;
    processInit: ProcessInit;
    emit: (value: any) => any;
};
/** Creates object with "value" key and ability to "subscribe" to value changes */
export declare function Signal<T>(initialValue: T): SignalObject<T>;
