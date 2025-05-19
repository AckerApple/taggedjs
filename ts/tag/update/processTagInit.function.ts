import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { processTag } from '../../render/update/processTag.function.js'
import { TemplaterResult } from '../getTemplaterResult.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { SupportContextItem } from '../createHtmlSupport.function.js'
import { ContextItem } from '../Context.types.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'
import { AnySupport } from '../AnySupport.type.js'

export function processTagInit(
  value: any,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: Counts,
  appendTo?: Element | undefined,
  insertBefore?: Text,
) {
  contextItem.checkValueChange = checkTagValueChange

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
