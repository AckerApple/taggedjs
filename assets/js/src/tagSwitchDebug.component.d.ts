type SelectedTag = null | string | undefined;
export declare const tagSwitchDebug: import("taggedjs").TaggedFunction<(_t?: any) => import("taggedjs").StringTag>;
export declare const ternaryPropTest: import("taggedjs").TaggedFunction<({ selectedTag }: {
    selectedTag: string | undefined | null;
}) => import("taggedjs").StringTag>;
export declare const tag1: import("taggedjs").TaggedFunction<({ title }: {
    title: string;
}) => import("taggedjs").StringTag>;
export declare const tag2: import("taggedjs").TaggedFunction<({ title }: {
    title: string;
}) => import("taggedjs").StringTag>;
export declare const tag3: import("taggedjs").TaggedFunction<({ title }: {
    title: string;
}) => import("taggedjs").StringTag>;
export declare const arraySwitching: import("taggedjs").TaggedFunction<({ selectedTag }: {
    selectedTag: SelectedTag;
}, _?: any) => import("taggedjs").StringTag>;
export {};
