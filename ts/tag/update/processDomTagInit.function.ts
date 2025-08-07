import { newSupportByTemplater, processTag, tagFakeTemplater } from '../../render/update/processTag.function.js'
import { SupportTagGlobal } from '../getTemplaterResult.function.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import type { StringTag } from '../StringTag.type.js'
import type { DomTag } from '../DomTag.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { Tag } from '../Tag.type.js'

export function processDomTagInit(
  value: TemplateValue | Tag, // StringTag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport | undefined {
  const tag = value as StringTag | DomTag
  let templater = tag.templater

  if(!templater) {
    templater = tagFakeTemplater(tag)
  }

  const global = getNewGlobal(contextItem as SupportContextItem) as SupportTagGlobal

  if(appendTo) {
    return processNewSubjectTag(
      templater,
      contextItem,
      ownerSupport,
      appendTo,
      insertBefore,
    )
  }

  global.newest = newSupportByTemplater(templater, ownerSupport, contextItem)

  return processTag(
    ownerSupport,
    contextItem as SupportContextItem,
  )
}
