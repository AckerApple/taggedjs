import { Props } from "./Props"
import { BaseTagSupport } from "./TagSupport.class"
import { TemplaterResult } from "./TemplaterResult.class"
import { deepEqual } from "./deepFunctions"

export function hasTagSupportChanged(
  oldTagSupport: BaseTagSupport,
  newTagSupport: BaseTagSupport,
  newTemplater: TemplaterResult,
): number | false {
  const sameSupport = oldTagSupport === newTagSupport
  const samePropConfig = oldTagSupport.propsConfig === newTagSupport.propsConfig
  // const sameProps = oldTagSupport.propsConfig.latest === newTagSupport.propsConfig.latest
  if(sameSupport) {
    throw new Error('sameSupport - 22')
  }
  if(samePropConfig) {
    throw new Error('samePropConfig - 22')
  }

  if(newTagSupport.templater.isTag || oldTagSupport.templater.isTag || newTemplater.isTag) {
    throw new Error('trying to compare a basic tag')
  }
  
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

    castedProps = {...props}
    castedPastProps = {...(pastCloneProps || {})}
    
    const allFunctionsMatch = Object.entries(castedProps as any).every(([key,value]) => {      
      /*if(!(key in (castedPastProps as any))) {
        return false
      }*/

      let compare = (castedPastProps as any)[key]

      if(!(value instanceof Function)) {
        return 4 // this will be checked in deepEqual
      }

      if(!(compare instanceof Function)) {
        return false // its a function now but was not before
      }

      // ensure we are comparing apples to apples as function get wrapped
      if(compare.original) {
        compare = compare.original
      }

      const original = (value as any).original
      if(original) {
        value = (value as any).original
      }
      
      if((value as any).toString() !== compare.toString()) {
        return false // both are function but not the same
      }

      delete (castedProps as any)[key] // its a function and not needed to be compared
      delete (castedPastProps as any)[key] // its a function and not needed to be compared

      return 5
    })

    if(!allFunctionsMatch) {
      return 6 // a change has been detected by function comparisons
    }
  }

  // ???
  const isEqual = deepEqual(castedPastProps, castedProps)
  return isEqual ? false : 7 // if equal then no changes
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
