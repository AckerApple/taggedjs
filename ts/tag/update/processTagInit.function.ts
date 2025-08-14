import { processTag } from '../../render/update/processTag.function.js'
import { TemplaterResult } from '../getTemplaterResult.function.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function processTagInit(
  value: TagJsVar,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  appendTo?: Element | undefined,
  insertBefore?: Text,
): AnySupport {
  contextItem.state = {}
  
  if(appendTo) {
    return processNewSubjectTag(
      value as TemplaterResult,
      contextItem,
      ownerSupport,
      appendTo,
      insertBefore,
    )
  }

  return processTag(
    ownerSupport,
    contextItem as SupportContextItem,
  )
}
