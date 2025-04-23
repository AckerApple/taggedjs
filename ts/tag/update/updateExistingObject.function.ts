import { AnySupport } from '../getSupport.function.js'
import { WrapRunner } from'../../alterProp.function.js'
import { syncPriorPropFunction } from './syncPriorPropFunction.function.js'

export function updateExistingObject(
  prop: Record<string, WrapRunner>,
  priorProp: Record<string, WrapRunner>,
  newSupport: AnySupport,
  ownerSupport: AnySupport,
  depth: number,
  maxDepth: number,
) {
  const keys = Object.keys(prop) 
  for(const name of keys){
    const subValue = prop[name]
    const oldProp = priorProp[name]

    const result = syncPriorPropFunction(
      oldProp,
      subValue,
      newSupport,
      ownerSupport,
      maxDepth,
      depth + 1,
    )

    if(subValue === result) {
      continue
    }
    
    const hasSetter = Object.getOwnPropertyDescriptor(prop, name)?.set
    if(hasSetter) {
      continue
    }

    prop[name] = result as WrapRunner
  }
  
  return prop
}
