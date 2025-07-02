import { ContextItem, ValueTypes } from "../tag/index.js";
import { TagJsVar } from "./tagJsVar.type.js";
export type HostCallback = (element: HTMLInputElement, newHostValue: HostValue, context: ContextItem) => any;
type Options = {
    onDestroy?: HostCallback;
    onInit?: HostCallback;
};
type AllOptions = Options & {
    onDestroy: HostCallback;
    callback: HostCallback;
};
/** Use to gain access to element */
export declare function host(callback: HostCallback, options?: Options): HostValue;
export declare namespace host {
    /** Attach a host to an element that only runs during initialization */
    const onInit: (callback: HostCallback) => HostValue;
    /** Attach a host to an element that only runs during element destruction */
    const onDestroy: (callback: HostCallback) => HostValue;
}
export type HostValue = TagJsVar & {
    tagJsType: typeof ValueTypes.host;
    options: AllOptions;
};
export {};
