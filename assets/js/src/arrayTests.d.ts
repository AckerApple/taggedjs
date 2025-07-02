type Player = {
    name: string;
    edit?: boolean;
    scores: any[];
};
export declare const arrays: import("taggedjs").TaggedFunction<() => (players?: Player[], renderCount?: number, counter?: number, _?: void) => import("taggedjs").Tag>;
export {};
