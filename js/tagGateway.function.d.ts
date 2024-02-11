import { TagComponent } from "./templater.utils.js";
export type dispatchEvent = (name: string, eventData: EventData) => void;
export declare function destroyGateways(): void;
export declare const tagGateway: (component: TagComponent) => {
    id: string;
};
export type EventData = {
    detail: Record<string, any>;
};
