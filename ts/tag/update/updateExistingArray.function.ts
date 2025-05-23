import { AnySupport } from '../AnySupport.type.js'
import { WrapRunner } from'../props/alterProp.function.js'
import { syncPriorPropFunction } from './syncPriorPropFunction.function.js'

export function updateExistingArray(
  prop: WrapRunner[],
  priorProp: WrapRunner,
  newSupport: AnySupport,
  ownerSupport: AnySupport,
  depth: number,
  maxDepth: number,
) {
  for (let index = prop.length - 1; index >= 0; --index) {
    const x = prop[index]
    const oldProp = (priorProp as unknown as unknown[])[index] as WrapRunner
    prop[index] = syncPriorPropFunction(
      oldProp,
      x,
      newSupport,
      ownerSupport,
      maxDepth,
      depth + 1,
    ) as WrapRunner
  }

  return prop
}
