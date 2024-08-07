import { Subject } from "taggedjs";
export declare const counters: import("taggedjs").TaggedFunction<({ appCounterSubject }: {
    appCounterSubject: Subject<number>;
}) => (readStartTime?: number) => import("taggedjs").StringTag>;
