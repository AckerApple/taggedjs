/** Inject a parent tag or host into the current context
 * For host functions, returns the value returned by the host callback
 * For tag components, returns the tag instance itself
 */
export declare function tagInject<T extends (...args: any[]) => any>(targetItem: T): ReturnType<T>;
