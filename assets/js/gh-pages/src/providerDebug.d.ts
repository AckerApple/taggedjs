export declare class TagDebugProvider {
    tagDebug: number;
    showDialog: boolean;
}
export declare function tagDebugProvider(): {
    upper: {
        name: string;
        test: number;
    };
    test: number;
};
export declare function upperTagDebugProvider(): {
    name: string;
    test: number;
};
export declare const providerDebugBase: ((_x?: string) => import("taggedjs").Tag) & {
    original: Function;
};
