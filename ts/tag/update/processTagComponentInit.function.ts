import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { AnySupport } from '../AnySupport.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function processTagComponentInit(
  value: TagJsVar,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: TagCounts,
  appendTo?: Element,
): AnySupport | undefined {
  getNewGlobal(contextItem) as SupportTagGlobal

  if(appendTo) {
    const processResult = processFirstSubjectComponent(
      value as TemplaterResult,
      contextItem as SupportContextItem,
      ownerSupport,
      counts,
      appendTo as Element,
    )
    
    return processResult
  }

  const processResult = processReplacementComponent(
    value as TemplaterResult,
    contextItem as SupportContextItem,
    ownerSupport,
    counts,
  )
        
  return processResult
}
