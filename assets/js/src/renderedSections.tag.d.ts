import { Subject } from "taggedjs";
import { ViewTypes } from "./sectionSelector.tag";
type OutputSection = {
    view: ViewTypes;
    title?: string;
    output?: any;
    emoji?: string;
    debug?: boolean;
    testFile?: string;
    contentHide?: boolean;
};
export declare const outputSections: (OutputSection & {
    tag: any;
})[];
export declare const renderedSections: import("taggedjs").TaggedFunction<(appCounterSubject: Subject<number>, viewTypes?: ViewTypes[]) => import("taggedjs").Tag>;
export {};
