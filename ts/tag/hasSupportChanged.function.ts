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


export function shallowPropMatch(
  props: Props,
  pastCloneProps: Props,
) {
  // if every prop the same, then no changes
  const len = props.length
  for (let index = 0; index < len; ++index) {
    const prop = props[index]
    const pastProp = pastCloneProps[index]
  
    if(isArray(prop) && isArray(pastProp)) {
      if(prop === pastProp) {
        continue
      }

      return 3.0 // not equal array
    }
  
    if(typeof(prop) === BasicTypes.function && typeof(pastProp) === BasicTypes.function) {
      continue // considered good
    }
  
    if(typeof(prop) === BasicTypes.object) {
      if(typeof(pastCloneProps) === BasicTypes.object) {
        const obEntries = Object.entries(prop)
        for (const subItem of obEntries) {
          const result = objectItemMatches(subItem, pastProp)
          if(!result) {
            return 3.1
          }
        }

      }
      
      continue // all sub objects matched
    }

    if(prop === pastProp) {
      continue // matched good
    }
  
    return 3.3 // not equal
  }

  return false // false means has not changed
}

export const shallowCompareDepth = 3
export const deepCompareDepth = 10

function objectItemMatches(
  [name, value]: [string, unknown],
  pastProp: any,
) {
  const pastValue = pastProp[name]

  if(typeof(value) === BasicTypes.function && typeof(pastValue) === BasicTypes.function) {
    return true
  }
  
  return pastValue === value
}
