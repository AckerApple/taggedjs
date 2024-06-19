type ObjectNode = {
    nodeName: string;
};
export type ObjectText = ObjectNode & {
    textContent: string;
    value?: unknown;
    domElement?: Text;
    marker?: Text;
};
export type Attribute = [string, any?] | [any];
export type ObjectElement = ObjectNode & {
    attributes: Attribute[];
    value?: unknown;
    children?: ObjectChildren;
    domElement?: HTMLElement;
    marker?: Text;
};
export type ObjectChildren = (ObjectText | ObjectElement)[];
export type DomObjectText = ObjectText & {
    textContent: string;
    domElement: Text;
    marker: Text;
};
export type DomObjectElement = ObjectElement & {
    attributes: [string, any][];
    children?: DomObjectChildren;
    domElement: HTMLElement;
    marker: Text;
};
export type DomObjectChildren = (DomObjectText | DomObjectElement)[];
export {};
