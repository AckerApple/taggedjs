import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { getTemplaterResult, SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { AnySupport, getSupport, Support } from '../Support.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'

export function processNewArrayValue(
  value: TemplateValue | ValueSubject<any>,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
): ContextItem {
  // const valueType = getValueType(value)
  const valueType = contextItem.global.nowValueType

  switch (valueType) {
    case ValueTypes.stateRender:
    case ValueTypes.tagComponent:
    case ValueTypes.subject:
        break

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

  return contextItem
}

function processNewTag(
  value: StringTag | DomTag,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
) {  
  const tag = value
  
  let templater = tag.templater

  // TODO: Can this ever happen?
  if(!templater) {
    templater = getTemplaterResult([])
    templater.tag = tag
    tag.templater = templater
  }

  const global = contextItem.global as SupportTagGlobal
  const newest = global.newest = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem
  )

  global.oldest = newest

  return contextItem
}
