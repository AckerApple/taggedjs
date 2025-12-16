import { ValueTypes } from "../tag/index.js";
import { MatchesInjection, TagJsVar } from "./tagJsVar.type.js";
/** On specific host life cycles, a callback can be called.
 * @state always an object */
export type HostCallback = (...args: any[]) => any;
type Options = {
    onDestroy?: HostCallback;
    onInit?: HostCallback;
};
type AllOptions = Options & {
    arguments?: any[];
    onDestroy: HostCallback;
    callback: HostCallback;
};
export type HostValueFunction<T extends ((args: any[]) => any)> = HostValue & T;
/** Use to gain access to element
 * @callback called every render
 */
export declare function host<T extends HostCallback>(callback: T, options?: Options): HostValueFunction<T>;
export declare namespace host {
    /** Attach a host to an element that only runs during initialization */
    const onInit: (callback: HostCallback) => HostValue;
    /** Attach a host to an element that only runs during element destruction */
    const onDestroy: (callback: HostCallback) => HostValue;
}
export type HostValue = TagJsVar & {
    tagJsType: typeof ValueTypes.host;
    options: AllOptions;
    matchesInjection: MatchesInjection;
};
export {};
