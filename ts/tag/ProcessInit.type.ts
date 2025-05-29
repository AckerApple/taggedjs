import type { TagCounts } from './TagCounts.type.js'
import { ContextItem } from './ContextItem.type.js'
import { AnySupport } from './AnySupport.type.js'

// import { StringTag } from '../tag/DomTag.type.js'
// import { SubscribeValue } from '../state/subscribe.function.js'
// import { TemplateValue } from '../tag/update/processFirstSubject.utils.js'
// import { SignalObject } from './signal.function.js'

export type ProcessInit = (
    // value: { tagJsType: string },
    value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
    contextItem: ContextItem,
    ownerSupport: AnySupport,
    counts: TagCounts,
    appendTo?: Element,      
    insertBefore?: Text,      
) => any