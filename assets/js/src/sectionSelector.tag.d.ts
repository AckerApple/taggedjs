export declare enum ViewTypes {
    Async = "async",
    Basic = "basic",
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
    AttributeDebug = "attributeDebug",
    Subscriptions = "subscriptions"
}
export declare const storage: {
    autoTest: boolean;
    views: ViewTypes[];
};
export declare function saveScopedStorage(): void;
export declare const sectionSelector: import("taggedjs").TaggedFunction<(viewTypes?: ViewTypes[]) => ((...children: import("taggedjs").TagChildContent[]) => import("taggedjs").ElementFunction & import("taggedjs").CombinedElementFunctions) & import("taggedjs/js/TagJsTags/TagJsTag.type").ReadOnlyVar & {
    tagName: string;
    innerHTML: any[];
    attributes: import("taggedjs/js/interpolations/optimizers/ObjectNode.types").Attribute[];
    contentId: number;
    elementFunctions: typeof import("taggedjs/js/elements/elementFunctions").elementFunctions;
    contexts?: import("taggedjs/js/TagJsTags/TagJsTag.type").TagJsTag<any>[];
    listeners: import("taggedjs/js/elements/ElementVarBase.type").MockElmListener[];
    allListeners: import("taggedjs/js/elements/ElementVarBase.type").MockElmListener[];
} & {
    key: import("taggedjs").KeyFunction;
    style: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    id: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    class: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    href: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    value: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    placeholder: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    minLength: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    maxLength: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    src: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    type: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    title: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    disabled: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    checked: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    selected: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    cellPadding: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    cellSpacing: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    border: import("taggedjs/js/elements/attributeCallables").AttributeCallable;
    attr: (nameOrValue: import("taggedjs/js/elements/ElementFunction.type").AttrValue, value?: import("taggedjs/js/elements/ElementFunction.type").AttrValue) => import("taggedjs").ElementFunction;
    attrs: (nameValuePairs: {
        [name: string]: import("taggedjs/js/elements/ElementFunction.type").AttrValue;
    }) => import("taggedjs").ElementFunction;
    contextMenu: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onClick: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onChange: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onInput: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onKeyup: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onKeydown: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onMouseover: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
    onMouseout: (callback: (e: import("taggedjs").InputElementTargetEvent) => any) => import("taggedjs").ElementFunction;
}>;
export declare function activate(type: ViewTypes, checkTesting?: boolean): void;
