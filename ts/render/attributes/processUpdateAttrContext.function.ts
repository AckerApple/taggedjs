import { AnySupport } from '../../tag/AnySupport.type.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processAttributeEmit } from './processAttribute.function.js'
import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { updateNameOnlyAttrValue } from '../../interpolations/attributes/updateAttribute.function.js'
import { TemplateValue } from '../../tag/TemplateValue.type.js'
import { TagCounts } from '../../tag/TagCounts.type.js'

export function processUpdateAttrContext(
  value: TemplateValue,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
  _counts: TagCounts,
  values: unknown[],
) {
  if(contextItem.isNameOnly) {
    updateNameOnlyAttrValue(
      values,
      value as string,
      contextItem.value,
      contextItem.element as Element,// global.element as Element,
      ownerSupport,
      contextItem.howToSet as HowToSet,
      [], // Context, but we dont want to alter current
      {added: 0, removed: 0},
    )

    contextItem.value = value

    return
  }

  const element = contextItem.element as Element

  console.log('processAttributeEmit-------', {
    valueIndex: contextItem.valueIndex,
    valueIndexSetBy: contextItem.valueIndexSetBy,
    attrName: contextItem.attrName,
    newAttrValue: value,
    isSpecial: contextItem.isSpecial,
    values,
    contextItem,
  })

  processAttributeEmit(
    value,
    contextItem.attrName as string,
    contextItem,
    element as HTMLElement,
    ownerSupport,
    contextItem.howToSet as HowToSet,
    contextItem.isSpecial as boolean,
    {added: 0, removed: 0},
  )

  contextItem.value = value

  return
}
