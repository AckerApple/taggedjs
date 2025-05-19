import { checkTagValueChange } from '../../tag/checkTagValueChange.function.js'
import { SupportTagGlobal, Wrapper } from '../../tag/getTemplaterResult.function.js'
import { oneRenderToSupport } from '../../tag/update/oneRenderToSupport.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { SupportContextItem } from '../../tag/createHtmlSupport.function.js'
import { renderTagOnly } from '../renderTagOnly.function.js'
import { TemplateValue } from '../../tag/update/processFirstSubject.utils.js'
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js'
import { ContextItem } from '../../tag/Context.types.js'
import { processNewSubjectTag } from '../../tag/update/processNewSubjectTag.function.js'
import { AnySupport } from '../../tag/AnySupport.type.js'

export function processRenderOnceInit(
  value: TemplateValue,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
) {
  getNewGlobal(contextItem) as SupportTagGlobal

  const support = oneRenderToSupport(
    value as Wrapper,
    contextItem as ContextItem,
    ownerSupport,
  )
  
  renderTagOnly(
    support,
    undefined,
    contextItem as SupportContextItem,
    ownerSupport,
  )

  const result = processNewSubjectTag(
    support.templater,
    contextItem as ContextItem,
    ownerSupport,
    counts,
    appendTo,
    insertBefore,
  )

  contextItem.checkValueChange = checkTagValueChange

  return result
}
