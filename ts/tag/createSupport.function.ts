import { TemplaterResult } from './getTemplaterResult.function.js'
import { ContextItem } from './ContextItem.type.js'
import { Props } from '../Props.js'
import { AnySupport } from './index.js'
import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js'
import { SupportContextItem } from './SupportContextItem.type.js'

export function createSupport(
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
