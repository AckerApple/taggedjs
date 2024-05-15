import { Props } from "../Props"
import { BaseTagSupport } from "./TagSupport.class"
import { TemplaterResult } from "../TemplaterResult.class"
import { deepEqual } from "../deepFunctions"

export function hasTagSupportChanged(
  oldTagSupport: BaseTagSupport,
  newTagSupport: BaseTagSupport,
  newTemplater: TemplaterResult,
): number | false {  
  const latestProps = newTemplater.props // newTagSupport.propsConfig.latest
  const pastCloneProps = oldTagSupport.propsConfig.latestCloned
  const propsChanged = hasPropChanges(latestProps, pastCloneProps)

  // if no changes detected, no need to continue to rendering further tags
  if(propsChanged) {
    return propsChanged
  }

  const kidsChanged = hasKidsChanged(oldTagSupport, newTagSupport)

  // we already know props didn't change and if kids didn't either, than don't render
  return kidsChanged
}

export function hasPropChanges(
  props: Props, // natural props
  pastCloneProps: Props, // previously cloned props
  // newTemplater: TemplaterResult,
): number | false {
  /*
  const isCommonEqual = props === undefined && props === compareToProps
  if(isCommonEqual) {
    return false
  }
  */
  let castedProps: Props = props
  let castedPastProps: Props = pastCloneProps

  // check all prop functions match
  if(typeof(props) === 'object') {
    if(!pastCloneProps) {
      return 3
    }

    // castedProps = {...props}
    castedProps = [...props]
    // castedPastProps = {...(pastCloneProps || {})}
    castedPastProps = [...(pastCloneProps || [])]
    
    const allFunctionsMatch = castedProps.every((value, index) => {      
      let compare = castedPastProps[index]

      if(value && typeof(value) === 'object') {
        const subCastedProps = {...value}
        const subCompareProps = {...compare || {}} as any
        const matched = Object.entries(subCastedProps).every(([key, value]) => {
          return compareProps(value, subCompareProps[key], () => {
            delete (subCastedProps as any)[key] // its a function and not needed to be compared
            delete (subCompareProps as any)[key] // its a function and not needed to be compared
          })
        })
        return matched
      }

      return compareProps(value, compare, () => {
        castedProps.splice(index, 1)
        castedPastProps.splice(index, 1)
      })
    })

    if(!allFunctionsMatch) {
      return 6 // a change has been detected by function comparisons
    }
  }

  // const isEqual = deepEqual(castedPastProps, castedProps)
  // return isEqual ? false : 7 // if equal then no changes
  return 7
}

/** returning a number means true good comparison */
function compareProps(
  value: unknown,
  compare: unknown,
  onDelete: () => any,
) {

  if(!(value instanceof Function)) {
    return deepEqual(value, compare) ? 4 : false
    return 4 // this will be checked in deepEqual
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
  
  if((value as any).toString() !== compareFn.toString()) {
    return false // both are function but not the same
  }

  onDelete()

  return 5
}

export function hasKidsChanged(
  oldTagSupport: BaseTagSupport,
  newTagSupport: BaseTagSupport,
): number | false {
  const oldCloneKidValues = oldTagSupport.propsConfig.lastClonedKidValues
  const newClonedKidValues = newTagSupport.propsConfig.lastClonedKidValues

  const everySame = oldCloneKidValues.every((set, index) => {
    const x = newClonedKidValues[index]
    return set.every((item, index) => item === x[index])
  })

  return everySame ? false : 9
}
