import { Context, ElementBuildOptions } from '../tag/Tag.class.js';
import { InsertBefore } from './InsertBefore.type.js';
import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { TagSupport } from '../tag/TagSupport.class.js';
export type Template = Element & {
    clone?: any;
};
export type InterpolateComponentResult = {
    subject: InterpolateSubject;
    insertBefore: Element | Text | Template;
    ownerSupport: TagSupport;
    variableName: string;
};
export declare function interpolateTemplate(insertBefore: Template, // <template end interpolate /> (will be removed)
context: Context, // variable scope of {`__tagvar${index}`:'x'}
ownerSupport: TagSupport, // Tag class
counts: Counts): InterpolateComponentResult | undefined;
export declare function subscribeToTemplate(insertBefore: InsertBefore, subject: InterpolateSubject, ownerSupport: TagSupport, counts: Counts): void;
export type Counts = {
    added: number;
    removed: number;
};
export declare function afterElmBuild(elm: Element | ChildNode, options: ElementBuildOptions, context: Context, ownerSupport: TagSupport): void;
