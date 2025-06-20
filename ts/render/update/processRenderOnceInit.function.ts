import { Wrapper } from '../../tag/getTemplaterResult.function.js'
import { oneRenderToSupport } from '../../tag/update/oneRenderToSupport.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { SupportContextItem } from '../../tag/SupportContextItem.type.js'
import { renderTagOnly } from '../renderTagOnly.function.js'
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processNewSubjectTag } from '../../tag/update/processNewSubjectTag.function.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { TemplateValue } from '../../tag/TemplateValue.type.js'

export function processRenderOnceInit(
  value: TemplateValue,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  getNewGlobal(contextItem)

  const support = oneRenderToSupport(
    value as Wrapper,
    contextItem as ContextItem,
    ownerSupport,
  )
  
  renderTagOnly(
    support,
    undefined,
    contextItem as SupportContextItem,
    // ownerSupport,
  )

  return processNewSubjectTag(
    support.templater,
    contextItem as ContextItem,
    ownerSupport,
    counts,
    appendTo,
    insertBefore,
  )
}
