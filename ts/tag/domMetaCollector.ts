import { TagTemplate } from './Tag.class.js'
import { htmlInterpolationToDomMeta } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { getStringsId } from './getStringsId.function.js'
import { isLastRunMatched } from './isLastRunMatched.function.js'
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'

const lastRuns: {[index: number]: TagTemplate} = {}

/** Converts strings & values into dom meta */
export function getDomMeta(
  strings: string[],
  values: unknown[],
) {
  const stringId = getStringsId(strings, values)
  const lastRun = lastRuns[stringId]
  const matches = lastRun && isLastRunMatched(strings, values, lastRun)
  let domMeta: ObjectChildren
  
  if(matches) {
    domMeta = lastRun.domMeta as ObjectChildren
    return domMeta
  }

  domMeta = htmlInterpolationToDomMeta(strings, values)

  const template = {
    interpolation: undefined as any,
    string: undefined as any,
    strings,
    values,
  
    domMeta,
  }

  lastRuns[stringId] = template

  return domMeta
}
