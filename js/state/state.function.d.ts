/** Used for variables that need to remain the same variable during render passes
 * Uses current running components read/write variables
*/
export declare function state<T>(defaultValue: T | (() => T)): T;
