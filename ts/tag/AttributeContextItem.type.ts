import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { AnySupport } from '../index.js'
import { SpecialDefinition } from '../render/attributes/Special.types.js'
import { BaseContextItem } from './ContextItem.type.js'

export interface AttributeContextItem extends BaseContextItem {
  isAttr?: true
  howToSet?: HowToSet
  isNameOnly?: boolean
  attrName?: string
  isSpecial?: SpecialDefinition
  element?: Element
  
  // Currently only used for host()
  stateOwner?: AnySupport
  supportOwner?: AnySupport
}