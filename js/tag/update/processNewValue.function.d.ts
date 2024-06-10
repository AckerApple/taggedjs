import { ValueSubject } from '../../subject/ValueSubject.js';
import { Support } from '../Support.class.js';
import { InterpolateSubject, TemplateValue } from './processFirstSubject.utils.js';
export declare function processNewValue(value: TemplateValue | ValueSubject<any>, ownerSupport: Support): InterpolateSubject;
