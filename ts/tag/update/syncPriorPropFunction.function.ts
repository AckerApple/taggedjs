import { AnySupport } from '../getSupport.function.js'
import { isSkipPropValue, WrapRunner } from'../../alterProp.function.js'
import { BasicTypes } from '../ValueTypes.enum.js'
import { isArray } from '../../isInstance.js'
import { updateExistingObject } from './updateExistingObject.function.js'
import { updateExistingArray } from './updateExistingArray.function.js'

export function syncPriorPropFunction(
  priorProp: WrapRunner,
  prop: WrapRunner,
  newSupport: AnySupport,
  ownerSupport: AnySupport,
  maxDepth: number,
  depth: number,
) {

  if(priorProp === undefined || priorProp === null) {
    return prop
  }

  // prevent infinite recursion
  if(depth > maxDepth) {
    return prop
  }

  if(typeof(priorProp) === BasicTypes.function) {
    // the prop i am receiving, is already being monitored/controlled by another parent
    if(prop.mem) {
      priorProp.mem = prop.mem
      return prop
    }

    priorProp.mem = prop

    return priorProp
  }

  if( isSkipPropValue(prop) ) {
    return prop // no children to crawl through
  }

  if(isArray(prop)) {
    return updateExistingArray(
      prop as unknown as WrapRunner[],
      priorProp,
      newSupport,
      ownerSupport,
      depth,
      maxDepth,
    )
  }

  return updateExistingObject(
    prop as unknown as Record<string, WrapRunner>,
    priorProp as unknown as Record<string, WrapRunner>,
    newSupport,
    ownerSupport,
    depth,
    maxDepth,
  )
}
