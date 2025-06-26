import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { isArray } from '../isInstance.js'
import { ValueType } from '../tag/ValueTypes.enum.js'
import { TemplateValue } from '../tag/TemplateValue.type.js'
import { TagJsVar } from './tagJsVar.type.js'
import { Tag } from '../tag/Tag.type.js'
import { getSimpleTagVar } from './getSimpleTagVar.function.js'
import { getArrayTagVar } from './getArrayTagJsVar.function.js'

export function valueToTagJsVar(
  value: TemplateValue | Tag | TagJsVar | unknown,
): TagJsVar {
  const tagJsType = (value as TemplaterResult)?.tagJsType as ValueType
  
  if(tagJsType) {
    return value as TagJsVar
  }

  return getBasicTagVar( value )
}

function getBasicTagVar(
  value: any,
): TagJsVar {
  if(isArray(value)) {
    return getArrayTagVar(value)
  }

  return getSimpleTagVar(value)
}
