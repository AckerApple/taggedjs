import { Subject } from "taggedjs";
export declare const storage: {
    autoTest: boolean;
    views: ViewTypes[];
};
export declare function saveScopedStorage(): void;
export declare enum ViewTypes {
    Todo = "todo",
    FunInPropsTag = "funInPropsTag",
    OneRender = "oneRender",
    WatchTesting = "watchTesting",
    Mirroring = "mirroring",
    Content = "content",
    Arrays = "arrays",
    Counters = "counters",
    TableDebug = "tableDebug",
    Props = "props",
    Child = "child",
    TagSwitchDebug = "tagSwitchDebug",
    ProviderDebug = "providerDebug"
}
export declare const sections: () => import("taggedjs").StringTag;
export declare const viewChanged: Subject<{
    type: ViewTypes;
    checkTesting: boolean;
}>;
export declare function activate(type: ViewTypes, checkTesting?: boolean): void;
