import { AnySupport } from '../index.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'

/** used to handle when value was subscribe but now is something else */
export function handleTagTypeChangeFrom(
  originalType: string,
  newValue: TemplateValue,
  ownerSupport: AnySupport,
  contextItem: ContextItem, // NOT the subContext
) {
  const isDifferent = !newValue || !(newValue as any).tagJsType || (newValue as any).tagJsType !== originalType

  if(isDifferent) {
    const oldTagJsTag = contextItem.tagJsVar as TagJsTag
    oldTagJsTag.destroy(contextItem, ownerSupport)

    updateToDiffValue(
      newValue as TemplateValue,
      contextItem, // subSubContext,
      ownerSupport,
      99,
    )
    return 99
  }
}