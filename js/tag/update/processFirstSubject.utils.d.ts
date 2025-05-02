import { TagGlobal, TemplaterResult } from '../getTemplaterResult.function.js';
import { ValueSubject } from '../../subject/ValueSubject.js';
import { RegularValue } from './processRegularValue.function.js';
import { Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js';
import { StringTag } from '../StringTag.type.js';
import { Subject } from '../../subject/index.js';
import { SubscribeValue } from '../../state/subscribe.function.js';
export type InterpolateSubject = (ValueSubject<unknown> | ValueSubject<Callback>) & {
    global: TagGlobal;
};
export type TemplateValue = StringTag | SubscribeValue | TemplaterResult | (StringTag | TemplaterResult)[] | RegularValue | Subject<unknown> | Callback;
