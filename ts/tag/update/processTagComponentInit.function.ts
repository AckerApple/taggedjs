import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { AnySupport } from '../index.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'

export function processTagComponentInit(
  value: TagJsTag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  _insertBefore?: Text,
  appendTo?: Element,
): AnySupport | undefined {
  getNewGlobal(contextItem as SupportContextItem) as SupportTagGlobal

  if(appendTo) {
    return processFirstSubjectComponent(
      value as TemplaterResult,
      contextItem as SupportContextItem,
      ownerSupport,
      appendTo as Element,
    )
  }

  return processReplacementComponent(
    value as TemplaterResult,
    contextItem as SupportContextItem,
    ownerSupport,
  )
}
