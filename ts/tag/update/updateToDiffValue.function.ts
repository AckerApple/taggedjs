import { SupportContextItem } from '../SupportContextItem.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { BasicTypes, TagJsComponent, TemplaterResult, TemplateValue, ValueType, ValueTypes } from '../index.js'
import { tryUpdateToTag } from './tryUpdateToTag.function.js'
import { isArray } from '../../isInstance.js'
import { processTagArray } from './arrays/processTagArray.js'
import { processNowRegularValue, RegularValue } from './processRegularValue.function.js'
import { AnySupport } from '../index.js'
import { getArrayTagVar } from '../../TagJsTags/getArrayTagJsTag.function.js'

export function updateToDiffValue(
  newValue: TemplateValue,
  context: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
  ignoreOrDestroyed: number | boolean,
) {
  // is new value a tag?
  const tagJsType = newValue && (newValue as TemplaterResult).tagJsType as ValueType
  
  delete context.deleted

  if(tagJsType) {
    if(tagJsType === ValueTypes.renderOnce) {
      return
    }

    tryUpdateToTag(
      context,
      newValue as TemplaterResult,
      ownerSupport,
    )

    return
  }

  if( isArray(newValue) ) {
    processTagArray(
      context,
      newValue as (TemplaterResult | TagJsComponent<any>)[],
      ownerSupport,
    )
    context.oldTagJsVar = context.tagJsVar
    context.tagJsVar = getArrayTagVar(newValue as (TemplaterResult | TagJsComponent<any>)[])
  
    return
  }

  if(typeof(newValue) === BasicTypes.function) {
    context.value = newValue // do not render functions that are not explicity defined as tag html processing
    return
  }
  
  if(ignoreOrDestroyed) { // TODO: is this check really needed?
    processNowRegularValue(
      newValue as RegularValue,
      context,
    )
  }
}
