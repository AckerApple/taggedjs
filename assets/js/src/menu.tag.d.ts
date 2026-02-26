export declare function getMenuNameByItem(router: {
    route: string;
    location: any;
}): "content" | "counters" | "todo" | "isolated" | "home";
export declare const menu: () => import("taggedjs").SubscribeValue;
/** @deprecated */
export declare function useMenuName(): "content" | "counters" | "todo" | "isolated" | "home";
