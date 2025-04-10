import { InputElementTargetEvent } from '../interpolations/attributes/ElementTargetEvent.interface.js';
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js';
import { RegularValue } from './update/processRegularValue.function.js';
type InputCallback = ((e: InputElementTargetEvent) => any);
export type TagValues = (InputCallback | RegularValue | null | unknown | undefined | object)[];
export declare function html(strings: string[] | TemplateStringsArray, ...values: TagValues): import("./StringTag.type.js").StringTag;
export declare namespace html {
    var dom: (dom: LikeObjectChildren, ...values: TagValues) => import("./getDomTag.function.js").DomTag;
}
export {};
