import { TagSupport } from "./TagSupport.class.js";
import { Subject } from "./Subject.js";
import { TemplaterResult } from "./templater.utils.js";
import { Tag } from "./Tag.class.js";
import { InterpolateSubject } from "./processSubjectValue.function.js";
export declare function updateExistingValue(subject: InterpolateSubject, value: TemplaterResult | Tag[] | TagSupport | Function | Subject<any>, ownerTag: Tag): void;
