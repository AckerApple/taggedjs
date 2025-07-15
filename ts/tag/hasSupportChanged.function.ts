import { isArray } from '../isInstance.js'
import { Props } from '../Props.js'
import { BaseSupport } from './BaseSupport.type.js'
import { PropsConfig } from './createHtmlSupport.function.js'
import { TemplaterResult } from './getTemplaterResult.function.js'
import { hasPropChanges } from './hasPropChanges.function.js'
import { BasicTypes } from './ValueTypes.enum.js'

/** Used when deciding if a support will even change (are the arguments the same?) */
export function hasSupportChanged(
  oldSupport: BaseSupport,
  newTemplater: TemplaterResult,
): number | string | false {
  const latestProps = newTemplater.props as Props
  const propsConfig = oldSupport.propsConfig as PropsConfig
  const pastCloneProps = propsConfig.latest
  
  const propsChanged = hasPropChanges(
    latestProps,
    pastCloneProps,
    oldSupport.templater.propWatch,
  )

  return propsChanged
}

export function immutablePropMatch(
  props: Props,
  pastCloneProps: Props,
) {
  // if every prop the same, then no changes
  const len = props.length
  for (let index = 0; index < len; ++index) {
    const prop = props[index]
    const pastProp = pastCloneProps[index]

    if(prop !== pastProp) {
      return 2
    }
  }

  return false // false means has not changed
}

export const shallowCompareDepth = 3
export const deepCompareDepth = 10
