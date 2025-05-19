import { TemplaterResult } from './getTemplaterResult.function.js'
import { getBaseSupport, SupportContextItem, upgradeBaseToSupport } from './createHtmlSupport.function.js'
import { AnySupport } from './AnySupport.type.js'

export function loadNewBaseSupport(
  templater: TemplaterResult,
  subject:SupportContextItem,
  appElement: Element,
) {
  const global = subject.global
  const newSupport = getBaseSupport(
    templater,
    subject as SupportContextItem,
  ) as AnySupport

  upgradeBaseToSupport(templater, newSupport, newSupport)
  
  newSupport.appElement = appElement
  global.oldest = global.oldest || newSupport
  global.newest = newSupport

  return newSupport
}
