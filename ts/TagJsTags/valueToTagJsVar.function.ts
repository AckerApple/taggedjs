import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { isArray } from '../isInstance.js'
import { ValueType } from '../tag/ValueTypes.enum.js'
import { TemplateValue } from '../tag/TemplateValue.type.js'
import { TagJsTag } from './TagJsTag.type.js'
import { getSimpleTagVar } from './getSimpleTagVar.function.js'
import { getArrayTagVar } from './getArrayTagJsTag.function.js'
import { TagJsComponent } from './index.js'

export function valueToTagJsVar(
  value: TemplateValue | TagJsComponent<any> | TagJsTag | unknown,
): TagJsTag {
  const tagJsType = (value as TemplaterResult)?.tagJsType as ValueType
  
  if(tagJsType) {
    return value as TagJsTag
  }

  return getBasicTagVar( value )
}

function getBasicTagVar(
  value: any,
): TagJsTag {
  if(isArray(value)) {
    return getArrayTagVar(value)
  }

  return getSimpleTagVar(value)
}
