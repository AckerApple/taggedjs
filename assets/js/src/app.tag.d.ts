import { Subject } from "taggedjs";
declare function appFun(): (menuName?: string) => import("taggedjs").Tag;
declare namespace appFun {
    var isApp: boolean;
}
export declare const App: import("taggedjs").TaggedFunction<typeof appFun>;
export declare const homePage: () => (showSections?: boolean, appCounter?: number, toggleValue?: boolean, testTimeout?: null, appCounterSubject?: Subject<number>, renderCount?: number, testEmoji?: string, _?: void, toggle?: () => void) => import("taggedjs").Tag;
export {};
