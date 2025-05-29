import { State } from '../state/index.js';
import { InterpolatedTemplates } from '../interpolations/interpolations.js';
import { DomMetaMap, LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js';
import { StringTag } from './StringTag.type.js';
import { DomTag } from './DomTag.type.js';
export type EventCallback = (event: Event) => any;
export type EventMem = {
    elm: Element;
    callback: EventCallback;
};
export type TagMemory = {
    state: State;
};
export interface TagTemplate {
    interpolation: InterpolatedTemplates;
    string: string;
    strings: string[];
    values: unknown[];
    domMetaMap?: DomMetaMap;
}
type ArrayItemStringTag<T> = StringTag & {
    arrayValue: T;
};
export type KeyFunction = 
/** Used in array.map() as array.map(x => html``.key(x))
 * - NEVER USE inline object key: array.map(x => html``.key({x}))
 * - NEVER USE inline array key: array.map((x, index) => html``.key([x, index]))
 */
<T>(arrayValue: T) => ArrayItemStringTag<T>;
/** When compiled to then run in browser */
export declare function getDomTag(dom: LikeObjectChildren, values: unknown[]): DomTag;
/** When runtime is in browser */
export declare function getStringTag(strings: string[], values: unknown[]): StringTag;
export {};
