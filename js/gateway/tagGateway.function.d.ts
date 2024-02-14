import { Tag } from "../Tag.class.js";
import { Props } from "../Props.js";
import { TagComponent } from "../templater.utils.js";
export declare const gatewayTagIds: {
    [id: string]: TagComponent;
};
export type dispatchEvent = (name: string, eventData: EventData) => void;
export type GatewayProps = Props & {
    [key: string]: unknown;
    dispatchEvent: dispatchEvent;
};
export declare function checkAllGateways(): void;
export declare function checkGateways(gateways: Gateway[]): void;
export declare function destroyGateway(gateway: Gateway): void;
export declare function getTagId(component: TagComponent): string;
export declare const tagGateway: (component: TagComponent) => {
    id: string;
};
export type EventData = {
    detail: Record<string, any>;
};
export type Gateway = {
    tag: Tag;
    id: string;
    observer: MutationObserver;
    element: HTMLElement;
    component: TagComponent;
    updateTag: () => unknown;
};
export declare function checkByElement(element: HTMLElement | Element): Gateway;
export declare function checkElement(id: string, element: Element, component: TagComponent): Gateway;
