import { SubjectLike } from './subject/subject.utils.js';
import { AnySupport } from './tag/index.js';
import { StringTag } from './tag/StringTag.type.js';
import { TemplaterResult } from './tag/getTemplaterResult.function.js';
export declare function isSimpleType(value: any): boolean;
/** Indicates if tag() was used */
export declare function isStaticTag(value?: TemplaterResult | StringTag | unknown): boolean;
/** passed in is expected to be a TemplaterResult */
export declare function isTagComponent(value?: TemplaterResult | Exclude<unknown, AnySupport>): boolean;
export declare function isSubjectInstance(subject?: SubjectLike<any> | any): boolean;
export declare function isPromise(value: any): any;
export declare function isFunction(value: any): boolean;
export declare function isObject(value: any): boolean;
export declare function isArray(value: any): value is any[];
