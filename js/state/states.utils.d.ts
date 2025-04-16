export type StateSet = <T extends any[]>(...a: [...T]) => [...T];
export type StatesSetter = (set: StateSet) => any;
export declare function firstStatesHandler(setter: StatesSetter): any;
export declare function reStatesHandler(setter: StatesSetter): any;
