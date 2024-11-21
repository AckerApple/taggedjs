type WithDestroy<T> = {
    destroy?: (event: Event) => T;
};
export declare function elementDestroyCheck<T>(nextSibling: Element & WithDestroy<T>, stagger: number): T | undefined;
export {};
