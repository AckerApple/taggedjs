import { InputElementTargetEvent } from "../interpolations/ElementTargetEvent.interface";
import { Tag } from "./Tag.class";
export type TagValues = (((e: InputElementTargetEvent) => any) | number | string | boolean | null | undefined | Object)[];
export declare function html(strings: string[] | TemplateStringsArray, ...values: TagValues): Tag;
