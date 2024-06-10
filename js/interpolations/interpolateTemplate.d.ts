import { Context, ElementBuildOptions } from '../tag/Tag.class.js';
import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { Support } from '../tag/Support.class.js';
export type Template = Element & {
    content: any;
};
export type InterpolateComponentResult = {
    subject: InterpolateSubject;
    insertBefore: Element | Text | Template;
    ownerSupport: Support;
    variableName: string;
};
export declare function interpolateTemplate(fragment: DocumentFragment, insertBefore: Template, // <template end interpolate /> (will be removed)
context: Context, // variable scope of {`__tagvar${index}`:'x'}
ownerSupport: Support, // Tag class
counts: Counts): void;
export type Counts = {
    added: number;
    removed: number;
};
/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export declare function afterElmBuild(elm: Element | ChildNode, options: ElementBuildOptions, context: Context, ownerSupport: Support): void;
