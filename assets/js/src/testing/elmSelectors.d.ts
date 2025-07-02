export declare function count(selector: string): number;
export declare const elmCount: typeof count;
export declare function query(query: string): HTMLElement[];
export declare function focus(q: string): void;
/** document.querySelectorAll(...).forEach(i => i.click()) */
export declare function click(q: string): void;
export declare function clickEach(items: HTMLElement[]): void;
export declare function clickById(id: string): void;
export declare function clickOne(q: string, index?: number): void;
export declare function keydownOn(input: Element, key: string): void;
export declare function keyupOn(input: Element, key?: string): void;
export declare function changeOne(q: string, index?: number): void;
export declare function changeElm(target: HTMLElement): void;
export declare function html(q: string): string;
export declare function textContent(q: string): string;
export declare function byId(id: string): HTMLElement & {
    value: string | number;
};
/** Returns empty string also when element not found */
export declare function htmlById(id: string): string;
export declare function lastById(id: string): Element;
export declare function blur(q: string): void;
export declare function change(q: string): void;
export declare function triggerBlurElm(elm: Element): void;
export declare function triggerChangeElm(elm: Element): void;
