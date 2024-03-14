import { TagSupport } from './TagSupport.class';
import { Subject } from './Subject';
import { TemplaterResult } from './templater.utils';
import { Tag } from './Tag.class';
import { InterpolateSubject } from './processSubjectValue.function';
import { RegularValue } from './processRegularValue.function';
type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag;
export declare function updateExistingValue(subject: InterpolateSubject, value: ExistingValue, ownerTag: Tag): void;
export {};
