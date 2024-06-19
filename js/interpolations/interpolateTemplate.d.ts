import { Context } from '../tag/Tag.class.js';
import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { AnySupport, Support } from '../tag/Support.class.js';
export type Template = Element & {
    content: any;
};
export type InterpolateComponentResult = {
    subject: InterpolateSubject;
    insertBefore: Element | Text | Template;
    ownerSupport: Support;
    variableName: string;
};
export type Counts = {
    added: number;
    removed: number;
};
export type ElementBuildOptions = {
    counts: Counts;
};
/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export declare function afterElmBuild(elm: Element | ChildNode, options: ElementBuildOptions, context: Context, ownerSupport: AnySupport): void;
