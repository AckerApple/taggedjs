export type StateSet = <T extends any[]>(...a: [...T]) => [...T];
export type StatesSetter = (set: StateSet, syncDirection?: number) => any;
export declare function firstStatesHandler(setter: StatesSetter): any;
/** aka statesHandler */
export declare function reStatesHandler(setter: StatesSetter): any;
