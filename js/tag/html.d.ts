import { InputElementTargetEvent } from '../interpolations/attributes/ElementTargetEvent.interface.js';
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js';
import { RegularValue } from './update/processRegularValue.function.js';
import { Tag } from './Tag.type.js';
export type InputCallback = ((e: InputElementTargetEvent) => unknown);
/** represents a single value within html`<div>${value}</div>`. The data typing of "& unknown" is to allow anything AND STILL infer functions have one argument if "e"  */
export type TagValue = (InputCallback | RegularValue | object) & unknown;
export type TagValues = TagValue[];
/** Used as html`<div></div>` */
export declare function html(strings: string[] | TemplateStringsArray, ...values: TagValues): Tag;
export declare namespace html {
    var dom: (dom: LikeObjectChildren, ...values: TagValues) => import("./DomTag.type.js").DomTag;
}
