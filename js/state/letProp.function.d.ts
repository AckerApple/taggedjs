/**
 * Enables the ability to maintain a change to a props value until the prop itself changes
 * @param prop typically the name of an existing prop
 * @returns immediately call the returned function: letProp(y)(x => [y, y=x])
 */
export declare function letProp<T>(setter: (set: <T>(...args: T[]) => T[]) => any): T[];
