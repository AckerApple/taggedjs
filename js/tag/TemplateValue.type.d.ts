import { TemplaterResult } from './getTemplaterResult.function.js';
import { RegularValue } from './update/processRegularValue.function.js';
import { Callback } from '../interpolations/attributes/bindSubjectCallback.function.js';
import { Subject } from '../subject/index.js';
import { SubscribeValue } from '../TagJsTags/subscribe.function.js';
import { TagJsComponent } from '../TagJsTags/index.js';
export type TemplateValue = TagJsComponent<any> | SubscribeValue | TemplaterResult | (TagJsComponent<any> | TemplaterResult)[] | RegularValue | Subject<unknown> | Callback;
