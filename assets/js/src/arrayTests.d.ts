type Player = {
    name: string;
    edit?: boolean;
    scores: any[];
};
export declare const arrayTests: import("taggedjs").TaggedFunction<() => (players?: Player[], renderCount?: number, counter?: number) => import("taggedjs").StringTag>;
export {};
