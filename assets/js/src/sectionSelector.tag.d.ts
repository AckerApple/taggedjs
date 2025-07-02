import { Subject } from "taggedjs";
export declare const storage: {
    autoTest: boolean;
    views: ViewTypes[];
};
export declare function saveScopedStorage(): void;
export declare enum ViewTypes {
    Destroys = "destroys",
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
    ProviderDebug = "providerDebug",
    AttributeDebug = "attributeDebug"
}
export declare const sectionSelector: {
    (viewTypes?: ViewTypes[]): import("taggedjs").Tag;
    tempNote: string;
};
export declare const viewChanged: Subject<{
    type: ViewTypes;
    checkTesting: boolean;
}>;
export declare function activate(type: ViewTypes, checkTesting?: boolean): void;
