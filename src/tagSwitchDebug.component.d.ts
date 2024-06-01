import { Tag } from "taggedjs";
type SelectedTag = null | string | undefined;
export declare const tagSwitchDebug: import("taggedjs").TaggedFunction<(_t?: any) => Tag>;
export declare const ternaryPropTest: import("taggedjs").TaggedFunction<({ selectedTag }: {
    selectedTag: string | undefined | null;
}) => Tag>;
export declare const tag1: import("taggedjs").TaggedFunction<({ title }: {
    title: string;
}) => Tag>;
export declare const tag2: import("taggedjs").TaggedFunction<({ title }: {
    title: string;
}) => Tag>;
export declare const tag3: import("taggedjs").TaggedFunction<({ title }: {
    title: string;
}) => Tag>;
export declare const arraySwitching: import("taggedjs").TaggedFunction<({ selectedTag }: {
    selectedTag: SelectedTag;
}) => Tag>;
export {};
