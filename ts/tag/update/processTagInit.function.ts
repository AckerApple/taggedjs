import { processTag } from '../../render/update/processTag.function.js'
import { TemplaterResult } from '../getTemplaterResult.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function processTagInit(
  value: TagJsVar,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  appendTo?: Element | undefined,
  insertBefore?: Text,
): AnySupport {
  if(appendTo) {
    return processNewSubjectTag(
      value as TemplaterResult,
      contextItem,
      ownerSupport,
      counts,
      appendTo,
      insertBefore,
    )
  }

  return processTag(
    ownerSupport,
    contextItem as SupportContextItem,
    counts,
  )
}
