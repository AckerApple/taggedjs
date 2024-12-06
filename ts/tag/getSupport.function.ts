import { TemplaterResult } from './TemplaterResult.class.js'
import { ContextItem } from './Context.types.js'
import { Props } from '../Props.js'
import { AnySupport, getBaseSupport, SupportContextItem, upgradeBaseToSupport } from './Support.class.js'

export function getSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  ownerSupport: AnySupport,
  appSupport: AnySupport,
  subject: ContextItem,
  castedProps?: Props,
): AnySupport {
  const support = getBaseSupport(
    templater,
    subject as SupportContextItem,
    castedProps
  ) as AnySupport

  support.ownerSupport = ownerSupport

  return upgradeBaseToSupport(templater, support, appSupport, castedProps)
}
