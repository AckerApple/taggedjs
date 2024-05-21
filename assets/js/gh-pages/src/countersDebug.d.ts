import { Subject } from "taggedjs";
export declare const counters: (({ appCounterSubject }: {
    appCounterSubject: Subject<number>;
}) => import("taggedjs").Tag) & {
    original: Function;
};
