import { SupportContextItem } from '../SupportContextItem.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { BasicTypes, TemplaterResult, TemplateValue, ValueType, ValueTypes } from '../index.js'
import { tryUpdateToTag } from './tryUpdateToTag.function.js'
import { isArray } from '../../isInstance.js'
import { processTagArray } from './processTagArray.js'
import { processNowRegularValue, RegularValue } from './processRegularValue.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { getArrayTagVar } from '../../tagJsVars/getArrayTagJsVar.function.js'

export function updateToDiffValue(
  newValue: TemplateValue,
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
  ignoreOrDestroyed: number | boolean,
) {
  // is new value a tag?
  const tagJsType = newValue && (newValue as TemplaterResult).tagJsType as ValueType
  if(tagJsType) {
    if(tagJsType === ValueTypes.renderOnce) {
      return
    }

    tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      ownerSupport,
    )

    return
  }

  if( isArray(newValue) ) {
    processTagArray(
      contextItem,
      newValue,
      ownerSupport,
      {added: 0, removed: 0},
    )
    contextItem.tagJsVar = getArrayTagVar(newValue)
  
    return
  }

  if(typeof(newValue) === BasicTypes.function) {
    contextItem.value = newValue // do not render functions that are not explicity defined as tag html processing
    return
  }
  
  if(ignoreOrDestroyed) {
    processNowRegularValue(
      newValue as RegularValue,
      contextItem,
    )
  }
}
