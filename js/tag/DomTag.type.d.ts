import { TagValues } from './html.js';
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js';
import { StringTag } from './StringTag.type.js';
import { Tag } from './Tag.type.js';
export type { StringTag };
export declare const variablePrefix = ":tagvar";
export declare const variableSuffix = ":";
export type EventCallback = (event: Event) => any;
export type EventMem = {
    elm: Element;
    callback: EventCallback;
};
export type DomTag = Tag & {
    children?: {
        dom: LikeObjectChildren;
        values: TagValues;
    };
    dom: LikeObjectChildren;
    values: unknown[];
    /** used in array.map() */
    key: (arrayValue: unknown) => DomTag;
    html: {
        dom: (dom: LikeObjectChildren, // ObjectChildren
        values: TagValues) => DomTag;
    };
};
