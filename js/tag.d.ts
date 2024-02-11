import { Tag } from "./Tag.class.js";
import { TagComponent } from "./templater.utils.js";
export declare const tags: TagComponent[];
export type TagEnv = {
    parentNode: HTMLElement | Element;
    children?: Tag;
};
export declare function tag<T>(tagComponent: T | TagComponent): T;
