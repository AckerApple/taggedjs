import { processTag } from '../../render/update/processTag.function.js'
import { TemplaterResult } from '../getTemplaterResult.function.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'
import { AnySupport } from '../index.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'

export function processTagInit(
  value: TagJsTag,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  appendTo?: Element | undefined,
): AnySupport {
  contextItem.state = {}
  
  if(contextItem.inputsHandler) {
    const props = ownerSupport.propsConfig
    contextItem.inputsHandler( props )
  }
  
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
