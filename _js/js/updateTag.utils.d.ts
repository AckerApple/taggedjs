import { TagSubject } from "./Tag.utils.js";
import { TagSupport } from "./getTagSupport.js";
import { Subject } from "./Subject.js";
import { TemplaterResult } from "./templater.utils.js";
import { Tag } from "./Tag.class.js";
export declare function updateExistingValue(existing: Subject<Tag> | TemplaterResult | TagSubject, value: TemplaterResult | TagSupport | Function | Subject<any>, tag: Tag): void;
