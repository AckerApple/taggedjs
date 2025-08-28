import { Wrapper } from '../../tag/getTemplaterResult.function.js'
import { oneRenderToSupport } from '../../tag/update/oneRenderToSupport.function.js'
import { SupportContextItem } from '../../tag/SupportContextItem.type.js'
import { firstTagRender } from '../renderTagOnly.function.js'
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processNewSubjectTag } from '../../tag/update/processNewSubjectTag.function.js'
import { AnySupport } from '../../tag/index.js'
import { TemplateValue } from '../../tag/TemplateValue.type.js'

export function processRenderOnceInit(
  value: TemplateValue,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  insertBefore?: Text,
  appendTo?: Element,
) {
  getNewGlobal(contextItem as SupportContextItem)

  const support = oneRenderToSupport(
    value as Wrapper,
    contextItem as ContextItem,
    ownerSupport,
  )
  
  firstTagRender(
    support,
    undefined,
    contextItem as SupportContextItem,
    // ownerSupport,
  )

  return processNewSubjectTag(
    support.templater,
    contextItem as ContextItem,
    ownerSupport,
    appendTo,
    insertBefore,
  )
}
