import { InputElementTargetEvent } from '../interpolations/attributes/ElementTargetEvent.interface.js';
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js';
import { RegularValue } from './update/processRegularValue.function.js';
import { Tag } from './Tag.type.js';
type InputCallback = ((e: InputElementTargetEvent) => any);
export type TagValues = (InputCallback | RegularValue | null | unknown | undefined | object)[];
/** Used as html`<div></div>` */
export declare function html(strings: string[] | TemplateStringsArray, ...values: TagValues): Tag;
export declare namespace html {
    var dom: (dom: LikeObjectChildren, ...values: TagValues) => import("./DomTag.type.js").DomTag;
}
export {};
