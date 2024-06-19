import { InputElementTargetEvent } from '../interpolations/ElementTargetEvent.interface.js';
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
import { RegularValue } from '../subject.types.js';
import { Tag, Dom } from './Tag.class.js';
export type TagValues = (((e: InputElementTargetEvent) => any) | RegularValue | null | undefined | Object)[];
export declare function html(strings: string[] | TemplateStringsArray, ...values: TagValues): Tag;
export declare namespace html {
    var dom: (dom: ObjectChildren, ...values: TagValues) => Dom;
}
