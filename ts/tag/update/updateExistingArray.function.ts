import { AnySupport } from '../getSupport.function.js'
import { WrapRunner } from'../../alterProp.function.js'
import { syncPriorPropFunction } from './syncPriorPropFunction.function.js'

export function updateExistingArray(
  prop: WrapRunner[],
  priorProp: WrapRunner,
  newSupport: AnySupport,
  ownerSupport: AnySupport,
  depth: number,
) {
  for (let index = prop.length - 1; index >= 0; --index) {
    const x = prop[index]
    const oldProp = (priorProp as unknown as unknown[])[index] as WrapRunner
    prop[index] = syncPriorPropFunction(
      oldProp,
      x,
      newSupport,
      ownerSupport,
      depth + 1,
      index,
    ) as WrapRunner
  }

  return prop
}
