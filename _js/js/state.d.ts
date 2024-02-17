export type StateConfig = ((x?: any) => [any, any]);
type StateConfigItem = {
    callback?: StateConfig;
    lastValue?: any;
    defaultValue?: any;
};
export type StateConfigArray = StateConfigItem[];
export type Config = {
    array: StateConfigArray;
    rearray: StateConfigArray;
};
export type State = {
    newest: StateConfigArray;
};
/**
 * @template T
 * @param {T} defaultValue
 * @returns {T}
 */
export declare function state<T>(defaultValue: T | (() => T), getSetMethod?: (x: T) => [T, T]): T;
export declare function getStateValue(state: StateConfigItem): any;
export declare class StateEchoBack {
}
export {};
