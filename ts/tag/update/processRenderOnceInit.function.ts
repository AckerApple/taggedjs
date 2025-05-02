import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { SupportTagGlobal, Wrapper } from '../getTemplaterResult.function.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport, SupportContextItem } from '../getSupport.function.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../Context.types.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'

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
