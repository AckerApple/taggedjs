import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport, SupportContextItem } from '../getSupport.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../Context.types.js'

export function processTagComponentInit(
  value: any,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
): AnySupport | undefined {
  getNewGlobal(contextItem) as SupportTagGlobal
  contextItem.checkValueChange = checkTagValueChange

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
