import { StringTag, DomTag } from '../Tag.class.js'
import { ContextItem } from '../Context.types.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { getTemplaterResult, SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { AnySupport, getSupport } from '../Support.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueTypes, ValueType } from '../ValueTypes.enum.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { checkTagValueChange } from '../checkDestroyPrevious.function.js'

export function processNewArrayValue(
  value: TemplateValue | ValueSubject<any>,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
): ContextItem {
  const tagJsType = (value as any).tagJsType as ValueType
  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater:
        const templater = value as TemplaterResult
        const tag = templater.tag as StringTag | DomTag
        processNewTag(tag, ownerSupport, contextItem)
        break
      
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
    templater = getTemplaterResult([])
    templater.tag = tag
    tag.templater = templater
  }

  const global = contextItem.global = getNewGlobal() as SupportTagGlobal // contextItem.global as SupportTagGlobal
  const newest = global.newest = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem
  )

  global.oldest = newest

  return contextItem
}
