// taggedjs-no-compile

import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js'
import { isFunction } from '../../isInstance.js'
import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { bindSubjectCallback, Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/index.js'
import { paintContent } from '../paint.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { getNewContext } from '../addOneContext.function.js'
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { createDynamicArrayAttribute, createDynamicAttribute } from './createDynamicAttribute.function.js'
import { getTagJsTag, TagVarIdNum } from './getTagJsTag.function.js'
import { NoDisplayValue } from './NoDisplayValue.type.js'
import { SpecialDefinition } from './Special.types.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'
import { TemplateValue } from '../../index.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { processStandAloneAttribute } from './processStandAloneAttribute.function.js'
import { processTagJsTagAttribute } from './processTagJsAttribute.function.js'

/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(
  attrName: string | TagVarIdNum,
  value: string | null | undefined | TagVarIdNum,
  values: unknown[], // all the variables inside html``
  element: HTMLElement,
  support: AnySupport,
  howToSet: HowToSet, //  = howToSetInputValue
  contexts: ContextItem[],
  parentContext: ContextItem,
  isSpecial: SpecialDefinition,
): ContextItem | ContextItem[] | void {
  const varIndex = getTagJsTag(attrName)
  let isNameVar = varIndex >= 0 || (value === undefined && typeof(attrName) !== 'string')
  let valueInValues = values[ varIndex ] as TemplateValue

  // value or name from bolt?
  if ((value as any)?.tagJsType) {
    valueInValues = value as any // the value is a TagJsTag
  } else if ((attrName as any)?.tagJsType) {
    isNameVar = true
    valueInValues = attrName as any // the name is a TagJsTag
    value = attrName
  }

  const tagJsVar = valueInValues as TagJsTag | undefined
  if( tagJsVar?.tagJsType ) {
    return processTagJsTagAttribute(
      value,
      [], // contexts,
      parentContext,
      tagJsVar,
      varIndex,
      support,
      attrName,
      element,
      isNameVar,
    )
  }

  if( isNameVar ) {
    // old way of setting by html``
    if(varIndex === -1 && isNameVar) {
      valueInValues = attrName as TemplateValue // its a name only value attribute
    }

    const contextItem = getNewContext(
      valueInValues,
      [], // contexts,
      true,
      parentContext,
    ) as any as AttributeContextItem

    contextItem.valueIndex = varIndex
    contextItem.isAttr = true
    contextItem.target = element
    contextItem.isNameOnly = true
    contextItem.howToSet = howToSet

    const TagJsTag = contextItem.tagJsVar
    TagJsTag.processUpdate = processUpdateAttrContext

    // single/stand alone attributes
    const aloneResult = processStandAloneAttribute(
      values,
      valueInValues as any,
      element,
      support,
      howToSet as HowToSet,
      contexts,
      parentContext,
    )

    if(aloneResult) {
      contexts.push( ...aloneResult )
    }

    return contextItem
  }

  if(Array.isArray(value)) {
    return createDynamicArrayAttribute(
      attrName as string,
      value,
      element,
      [], // contexts,
      howToSet,
      values,
      support.context,
    )
  }

  const valueVar = getTagJsTag(value)
  if(valueVar >= 0) {
    const value = values[valueVar]
    return createDynamicAttribute(
      attrName as string,
      value,
      element,
      [], // contexts,
      parentContext,
      howToSet,
      support,
      isSpecial,
      valueVar,
    )
  }

  // simple name/value attribute
  return processNonDynamicAttr(
    attrName as string,
    value as string,
    element,
    howToSet,
    isSpecial,
    parentContext,
  )
}


/** Only used during updates */
export function processAttributeEmit(
  newAttrValue: any,
  attrName: string,
  subject: AttributeContextItem,
  element: HTMLElement,
  support: AnySupport,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
) {
  // should the function be wrapped so every time its called we re-render?
  if(isFunction(newAttrValue)) {
    return callbackFun(
      support,
      newAttrValue,
      element,
      attrName,
      isSpecial,
      howToSet,
      subject,
    )
  }
  
  return processAttributeSubjectValue(
    newAttrValue,
    element,
    attrName,
    isSpecial,
    howToSet,
    support,
  )
}

type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean

/** figure out what type of attribute we are dealing with and/or feed value into handler to figure how to update */
export function processAttributeSubjectValue(
  newAttrValue: DisplayValue | NoDisplayValue,
  element: HTMLElement,
  attrName: string,
  special: SpecialDefinition,
  howToSet: HowToSet,
  support: AnySupport,
) {
  // process adding/removing style. class. (false means remove)
  if ( special !== false ) {
    specialAttribute(
      attrName,
      newAttrValue,
      element,
      special, // string name of special
    )
    return
  }

  switch (newAttrValue) {
    case undefined:
    case false:
    case null:
      paintContent.push([paintContentPush, [element, attrName]])
      return
  }

  if( isFunction(newAttrValue) ) {
    return processAttributeFunction(element, newAttrValue as Callback, support, attrName)
  }

  // value is 0
  howToSet(element, attrName, newAttrValue as string)
}

function callbackFun(
  support: AnySupport,
  newAttrValue: any,
  element: HTMLElement,
  attrName: string,
  isSpecial: SpecialDefinition,
  howToSet: HowToSet,
  _subject: AttributeContextItem,
) {
  const wrapper = support.templater.wrapper
  const tagJsType = wrapper?.tagJsType || (wrapper?.original as any)?.tagJsType
  const oneRender = tagJsType === ValueTypes.renderOnce
  
  if(!oneRender) {
    return processTagCallbackFun(
      // subject,
      newAttrValue,
      support,
      attrName,
      element,
    )
  }

  return processAttributeSubjectValue(
    newAttrValue,
    element,
    attrName,
    isSpecial,
    howToSet,
    support,
  )
}

export function processTagCallbackFun(
  // subject: AttributeContextItem,
  newAttrValue: any,
  support: AnySupport,
  attrName: string,
  element: Element,
) {
  // tag has state and will need all functions wrapped to cause re-renders
  newAttrValue = bindSubjectCallback(newAttrValue, support)

  // const TagJsTag = subject.tagJsVar // = valueToTagJsVar(newAttrValue)
  // TagJsTag.processUpdate = processUpdateAttrContext

  return processAttributeFunction(element, newAttrValue, support, attrName)
}

function paintContentPush(element: Element, attrName: string) {
  element.removeAttribute(attrName)
}
