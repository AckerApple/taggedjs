import { AnySupport } from "../index.js";
/** Used to call a function that belongs to a calling tag but is not with root arguments */
export declare function output<CallbackReturn, ReceivedArguments extends any[]>(callback: ((...args: any[]) => CallbackReturn)): (...args: ReceivedArguments) => CallbackReturn;
export declare function syncWrapCallback(args: any[], callback: any, ownerSupport: AnySupport): any;
