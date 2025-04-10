import { getTemplaterResult,SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueTypes, ValueType } from '../ValueTypes.enum.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { AnySupport } from '../getSupport.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { StringTag, DomTag } from '../getDomTag.function.js'
import { ContextItem } from '../Context.types.js'
import { PropWatches } from '../tag.js'
import { getSupport } from '../getSupport.function.js'

export function processNewArrayValue(
  value: TemplateValue | ValueSubject<unknown>,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
): ContextItem {
  const tagJsType = (value as TemplaterResult).tagJsType as ValueType
  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater: {
        const templater = value as TemplaterResult
        const tag = templater.tag as StringTag | DomTag
        processNewTag(tag, ownerSupport, contextItem)
        break
      }
      
      case ValueTypes.tag:
      case ValueTypes.dom:
        processNewTag(value as StringTag | DomTag, ownerSupport, contextItem)
        break
    }
  }

  return contextItem
}

function processNewTag(
  value: StringTag | DomTag,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
) {
  contextItem.checkValueChange = checkTagValueChange
  const tag = value
  
  let templater = tag.templater

  // TODO: Can this ever happen?
  if(!templater) {
    templater = getTemplaterResult(PropWatches.DEEP)
    templater.tag = tag
    tag.templater = templater
  }

  const global = contextItem.global = getNewGlobal(contextItem) as SupportTagGlobal // contextItem.global as SupportTagGlobal
  const newest = global.newest = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem
  )

  global.oldest = newest

  return contextItem
}
