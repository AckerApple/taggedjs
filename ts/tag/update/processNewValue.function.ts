import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { AnySupport, Support } from '../Support.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getValueType } from '../getValueType.function.js'

export function processNewValue(
  value: TemplateValue | ValueSubject<any>,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
): ContextItem {
  const valueType = getValueType(value)

  if(contextItem.global.isAttr) {
    contextItem.support = ownerSupport
    contextItem.global.lastValue = value
    contextItem.value = value
    return contextItem
  }

  switch (valueType) {
    case ValueTypes.stateRender:
    case ValueTypes.tagComponent:
      contextItem.tagJsType = ValueTypes.tagJsSubject
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

    // its already a subject
    case ValueTypes.subject:
      contextItem.tagJsType = ValueTypes.subject
      break
  }

  // after processing
  contextItem.value = value
  contextItem.tagJsType = valueType
  contextItem.global.lastValue = value
  contextItem.global.nowValueType = valueType

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

  contextItem.value = templater,
  contextItem.tagJsType = getValueType(templater)

  contextItem.support = new Support(
    templater,
    ownerSupport,
    contextItem
  )

  contextItem.global.oldest = contextItem.support
  ownerSupport.subject.global.childTags.push(contextItem.support as Support)

  return contextItem
}
