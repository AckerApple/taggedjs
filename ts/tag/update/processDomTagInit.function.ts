import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { newSupportByTemplater, processTag, tagFakeTemplater } from './processTag.function.js'
import { SupportTagGlobal } from '../getTemplaterResult.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { SupportContextItem } from '../createHtmlSupport.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import type { StringTag } from '../StringTag.type.js'
import type { DomTag } from '../DomTag.type.js'
import { ContextItem } from '../Context.types.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'
import { AnySupport } from '../AnySupport.type.js'

export function processDomTagInit(
  value: TemplateValue | StringTag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport | undefined {
  contextItem.checkValueChange = checkTagValueChange
  const tag = value as StringTag | DomTag
  let templater = tag.templater

  if(!templater) {
    templater = tagFakeTemplater(tag)
  }

  const global = getNewGlobal(contextItem) as SupportTagGlobal

  if(appendTo) {
    return processNewSubjectTag(
      templater,
      contextItem,
      ownerSupport,
      counts,
      appendTo,
      insertBefore,
    )
  }

  global.newest = newSupportByTemplater(templater, ownerSupport, contextItem)
  contextItem.checkValueChange = checkTagValueChange

  return processTag(
    ownerSupport,
    contextItem as SupportContextItem,
    counts,
  )
}
