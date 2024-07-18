import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { AnySupport, Support } from '../Support.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getValueType } from '../getValueType.function.js'

export function processNewArrayValue(
  value: TemplateValue | ValueSubject<any>,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
): ContextItem {
  const valueType = getValueType(value)
  contextItem.global.nowValueType = valueType

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

  // after processing
  contextItem.value = value
  contextItem.global.lastValue = value

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
    templater = new TemplaterResult([])
    templater.tag = tag
    tag.templater = templater
  }

  contextItem.value = templater

  const global = contextItem.global
  const newest = global.newest = new Support(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem
  )

  global.oldest = newest
  ownerSupport.subject.global.childTags.push(newest)

  return contextItem
}
