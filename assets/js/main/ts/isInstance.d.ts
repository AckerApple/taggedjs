import { SubjectLike } from "./Subject";
import { Tag } from "./Tag.class";
import { TemplaterResult } from "./TemplaterResult.class";
export declare function isTagComponent(value?: TemplaterResult | unknown): boolean;
export declare function isTagInstance(tag?: Tag | unknown): boolean;
export declare function isSubjectInstance(subject?: SubjectLike | any): Boolean;
export declare function isTagArray(value: any): boolean;
