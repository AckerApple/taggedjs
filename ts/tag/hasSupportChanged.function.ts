import { BaseSupport, PropsConfig } from './Support.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { hasPropChanges } from'./hasPropChanges.function.js'

export function hasSupportChanged(
  lastSupport: BaseSupport,
  newTemplater: TemplaterResult,
): number | string | false {
  const latestProps = newTemplater.props // newSupport.propsConfig.latest
  const propsConfig = lastSupport.propsConfig as PropsConfig
  const pastCloneProps = propsConfig.latestCloned  
  const propsChanged = hasPropChanges(latestProps, pastCloneProps)
  return propsChanged
}
