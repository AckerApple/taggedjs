import { TemplaterResult } from './getTemplaterResult.function.js'
import { RegularValue } from './update/processRegularValue.function.js'
import { Callback } from '../interpolations/attributes/bindSubjectCallback.function.js'
import { Subject } from '../subject/index.js'
import { SubscribeValue } from '../tagJsVars/subscribe.function.js'
import { Tag } from './Tag.type.js'

// what can be put down with ${}
export type TemplateValue = Tag | SubscribeValue | TemplaterResult | (Tag | TemplaterResult)[] | RegularValue | Subject<unknown> | Callback
