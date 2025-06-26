export type OnInitCallback = () => unknown;
/** EXPERIMENTAL. NOT LIKING. runs a callback function one time and never again. Same as calling state(() => ...)*/
export declare function useAwaits(): {
    add: Promise<any>;
};
