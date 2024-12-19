import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { AnySupport } from '../tag/getSupport.function.js';
export type Template = Element & {
    content: any;
};
export type InterpolateComponentResult = {
    subject: InterpolateSubject;
    insertBefore: Element | Text | Template;
    ownerSupport: AnySupport;
    variableName: string;
};
export type Counts = {
    added: number;
    removed: number;
};
