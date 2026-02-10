import { StateSet } from './states.utils.js';
/** @deprecated - Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export declare function states(setter: (set: StateSet, direction?: number) => any): void;
