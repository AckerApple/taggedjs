import { Props } from '../Props.js'
import { deepEqual } from '../deepFunctions.js'

/**
 * 
 * @param props 
 * @param pastCloneProps 
 * @returns WHEN number then props have changed. WHEN false props have not changed
 */
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
  return false
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