import { BaseSupport } from './Support.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { hasPropChanges } from'./hasPropChanges.function.js'

export function hasSupportChanged(
  lastSupport: BaseSupport,
  newSupport: BaseSupport,
  newTemplater: TemplaterResult,
): number | string | false {
  const latestProps = newTemplater.props // newSupport.propsConfig.latest
  const pastCloneProps = lastSupport.propsConfig.latestCloned
  
  const propsChanged = hasPropChanges(latestProps, pastCloneProps)
  // if no changes detected, no need to continue to rendering further tags
  if(propsChanged) {
    return propsChanged
  }

  const propsChanged2 = hasPropChanges(lastSupport.propsConfig.latestCloned, newSupport.propsConfig.latestCloned)
  if(propsChanged2) {
    return propsChanged2
  }

  return false
}
