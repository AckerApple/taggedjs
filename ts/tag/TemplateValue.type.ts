import { TemplaterResult } from './getTemplaterResult.function.js'
import { RegularValue } from './update/processRegularValue.function.js'
import { Callback } from '../interpolations/attributes/bindSubjectCallback.function.js'
import { StringTag } from './StringTag.type.js'
import { Subject } from '../subject/index.js'
import { SubscribeValue } from '../tagJsVars/subscribe.function.js'

// what can be put down with ${}
export type TemplateValue = StringTag | SubscribeValue | TemplaterResult | (StringTag | TemplaterResult)[] | RegularValue | Subject<unknown> | Callback
