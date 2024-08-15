import { deepEqual } from '../deepFunctions.js'
import { Props } from '../Props.js'
import { BaseSupport, PropsConfig } from './Support.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { BasicTypes } from './ValueTypes.enum.js'

export function hasSupportChanged(
  lastSupport: BaseSupport,
  newTemplater: TemplaterResult,
): number | string | false {
  const latestProps = newTemplater.props as Props
  const propsConfig = lastSupport.propsConfig as PropsConfig
  const pastCloneProps = propsConfig.latestCloned
  
  const propsChanged = hasPropChanges(
    latestProps,
    pastCloneProps,
    lastSupport.templater.deepPropWatch,
  )
  
  return propsChanged
}

/**
 * 
 * @param props 
 * @param pastCloneProps 
 * @returns WHEN number then props have changed. WHEN false props have not changed
 */
function hasPropChanges(
  props: Props, // natural props
  pastCloneProps: Props, // previously cloned props
  deepPropWatch: boolean,
): number | false {
  if(deepPropWatch === false) {
    return shallowPropMatch(props, pastCloneProps)
  }

  let castedProps: Props = props
  let castedPastProps: Props = pastCloneProps

  castedProps = [...props]
  castedPastProps = [...(pastCloneProps || [])]

  const allFunctionsMatch = castedProps.every((value, index) =>
    onePropCompare(value, index, castedProps, castedPastProps)
  )

  if(!allFunctionsMatch) {
    return 6 // a change has been detected by function comparisons
  }
  
  return false
}

function shallowPropMatch(
  props: Props,
  pastCloneProps: Props,
) {
  if(props.length !== pastCloneProps.length) {
    return 1 // amount of args has changed
  }

  // if every prop the same, then no changes
  const everyMatched = props.every((prop, index) => {
    const pastProp = pastCloneProps[index]
    
    if(prop instanceof Array && pastProp instanceof Array) {
      return prop === pastProp
    }

    if(prop instanceof Object) {
      if(pastCloneProps instanceof Object) {
        const result = Object.entries(prop).every(([name, value]) => pastProp[name] === value)
        return result
      }

      return false
    }

    return prop === pastProp
  })

  return everyMatched ? false : 2
}

function onePropCompare(
  value: any,
  index: number,
  castedProps: Props,
  castedPastProps: Props,
) {
  const compare = castedPastProps[index]

  if(value && typeof(value) === BasicTypes.object) {
    const subCastedProps = {...value}
    const subCompareProps = {...compare || {}} as any
    const matched = Object.entries(subCastedProps).every(([key, value]) =>
      compareProps(value, subCompareProps[key], () => {
        delete subCastedProps[key] // its a function and not needed to be compared
        delete subCompareProps[key] // its a function and not needed to be compared
      })
    )
    return matched
  }

  return compareProps(value, compare, () => {
    castedProps.splice(index, 1)
    castedPastProps.splice(index, 1)
  })
}

/** returning a number means true good comparison */
function compareProps(
  value: unknown,
  compare: unknown,
  onDelete: () => any,
) {
  if(!(value instanceof Function)) {
    return deepEqual(value, compare) ? 4 : false
  }

  const compareFn = compare as Function
  if(!(compareFn instanceof Function)) {
    return false // its a function now but was not before
  }

  // ensure we are comparing apples to apples as function get wrapped
  const compareOriginal = (compare as any)?.original
  if(compareOriginal) {
    compare = compareOriginal
  }

  const original = (value as any).original
  if(original) {
    value = (value as any).original
  }
  
  const valueString = (value as any).toString()
  const compareString = (compare as any).toString()
  if(valueString === compareString) {
    onDelete()
    return 3 // both are function the same
  }

  onDelete()

  return 5
}
