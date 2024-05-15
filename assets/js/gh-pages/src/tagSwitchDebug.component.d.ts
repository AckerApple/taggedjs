import { Tag } from "taggedjs";
type SelectedTag = null | string | undefined;
export declare const tagSwitchDebug: ((_t?: string) => Tag) & {
    original: Function;
};
export declare const ternaryPropTest: (({ selectedTag }: {
    selectedTag: string | undefined | null;
}) => Tag) & {
    original: Function;
};
export declare const tag1: (({ title }: {
    title: string;
}) => Tag) & {
    original: Function;
};
export declare const tag2: (({ title }: {
    title: string;
}) => Tag) & {
    original: Function;
};
export declare const tag3: (({ title }: {
    title: string;
}) => Tag) & {
    original: Function;
};
export declare const arraySwitching: (({ selectedTag }: {
    selectedTag: SelectedTag;
}) => Tag) & {
    original: Function;
};
export {};
