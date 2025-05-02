import { Counts } from '../interpolations/interpolateTemplate.js'
import { ContextItem } from '../tag/Context.types.js'
import { AnySupport } from '../tag/getSupport.function.js'

// import { StringTag } from '../tag/DomTag.type.js'
// import { SubscribeValue } from '../state/subscribe.function.js'
// import { TemplateValue } from '../tag/update/processFirstSubject.utils.js'
// import { SignalObject } from './signal.function.js'

export type ProcessInit = (
    // value: { tagJsType: string },
    value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
    contextItem: ContextItem,
    ownerSupport: AnySupport,
    counts: Counts, // {added:0, removed:0}
    appendTo?: Element,      
) => any