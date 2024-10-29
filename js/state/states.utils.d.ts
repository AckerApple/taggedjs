export type StatesSetter = (set: <T>(a: T) => T) => any;
export declare function firstStatesHandler(setter: StatesSetter): any;
export declare function reStatesHandler(setter: StatesSetter): any;
