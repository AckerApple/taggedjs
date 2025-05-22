import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { ProcessInit } from '../tag/ProcessInit.type.js';
/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export declare function signal<T>(initialValue: T): SignalObject;
export type SignalObject = {
    tagJsType: typeof ValueTypes.signal;
    value: any;
    subscribe: any;
    processInit: ProcessInit;
};
/** Creates object with "value" key and ability to "subscribe" to value changes */
export declare function Signal<T>(initialValue: T): SignalObject;
