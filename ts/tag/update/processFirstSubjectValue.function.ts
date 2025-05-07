import { checkArrayValueChange, checkSimpleValueChange } from '../checkDestroyPrevious.function.js'
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js'
import { TemplaterResult } from '../getTemplaterResult.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { RegularValue } from './processRegularValue.function.js'
import { isArray } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueType } from '../ValueTypes.enum.js'
import { processTagArray } from './processTagArray.js'
import type { StringTag } from '../StringTag.type.js'
import { ContextItem } from '../Context.types.js'
import { AnySupport } from '../AnySupport.type.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport | undefined {
  const tagJsType = (value as TemplaterResult)?.tagJsType as ValueType
  
  if(tagJsType) {
    return (value as any).processInit(
      value,
      contextItem,
      ownerSupport,
      counts,
      appendTo,
      insertBefore,
    )
  }

  if(isArray(value)) {
    processTagArray(
      contextItem,
      value as (StringTag | TemplaterResult)[],
      ownerSupport,
      counts,
      appendTo,
    )

    contextItem.checkValueChange = checkArrayValueChange

    return
  }

  processFirstRegularValue(
    value as RegularValue,
    contextItem,
    contextItem.placeholder as Text,
  )
}

function processFirstRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
  insertBefore: Text, // <template end interpolate /> (will be removed)
) {
  const castedValue = castTextValue(value)
  const clone = updateBeforeTemplate(
    castedValue,
    insertBefore, // this will be removed
  )

  subject.simpleValueElm = clone  
  subject.checkValueChange = checkSimpleValueChange
}
