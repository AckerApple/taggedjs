import type { TagCounts } from './TagCounts.type.js'
import { ContextItem } from './ContextItem.type.js'
import { AnySupport } from './AnySupport.type.js'

export type ProcessInit = (
    value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
    contextItem: ContextItem,
    ownerSupport: AnySupport,
    counts: TagCounts,
    appendTo?: Element,      
    insertBefore?: Text,      
) => any