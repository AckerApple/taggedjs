import { ContextItem, ValueTypes } from "../tag/index.js";
import { TagJsVar } from "./tagJsVar.type.js";
type HostCallback = (element: HTMLInputElement, newHostValue: HostValue) => any;
type Options = {
    onDestroy?: (element: HTMLInputElement) => any;
    onInit?: (element: HTMLInputElement, hostValue: HostValue, context: ContextItem) => any;
};
type AllOptions = Options & {
    onDestroy: (element: HTMLInputElement) => any;
    callback: HostCallback;
};
/** Use to gain access to element */
export declare function host(callback: HostCallback, options?: Options): HostValue;
export type HostValue = TagJsVar & {
    tagJsType: typeof ValueTypes.host;
    options: AllOptions;
};
export {};
