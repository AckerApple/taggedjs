import { TemplaterResult } from './getTemplaterResult.function.js'
import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js'
import { AnySupport } from './index.js'
import { SupportContextItem } from './SupportContextItem.type.js'

export function loadNewBaseSupport(
  templater: TemplaterResult,
  subject:SupportContextItem,
  appElement: Element,
) {
  const newSupport = getBaseSupport(
    templater,
    subject as SupportContextItem,
  ) as AnySupport

  upgradeBaseToSupport(templater, newSupport, newSupport)
  
  newSupport.appElement = appElement
  
  // Initialize older/newer with empty state if first render
  if (!subject.state.oldest) {
    subject.state.oldest = newSupport
    subject.state.older = subject.state.newer
  }
  
  subject.state.newest = newSupport

  return newSupport
}
