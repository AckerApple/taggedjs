export type HowToSet = (element: HTMLElement, name: string, value: string) => any;
export declare function howToSetInputValue(element: HTMLElement, name: string, value: string | undefined | boolean | Record<string, any>): void;
export declare function howToSetStandAloneAttr(element: HTMLElement, name: string, _value: string | undefined | boolean): void;
export declare function setNonFunctionInputValue(element: HTMLElement, name: string, value: string | undefined | boolean | Record<string, any>): void;
/** used for checked, selected, and so on */
export declare function setBooleanAttribute(element: HTMLElement, name: string, value: string | undefined | boolean): void;
export declare function setSimpleAttribute(element: HTMLElement, name: string, value: string | undefined | boolean | Record<string, any>): void;
