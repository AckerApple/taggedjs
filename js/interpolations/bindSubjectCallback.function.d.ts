/** File largely responsible for reacting to element events, such as onclick */
import { Support } from '../tag/Support.class.js';
export type Callback = (...args: any[]) => any & {
    isChildOverride?: true;
};
export declare function bindSubjectCallback(value: Callback, support: Support): Callback;
export declare function runTagCallback(value: Callback, support: Support, bindTo: unknown, args: any[]): Promise<string> | "no-data-ever";
