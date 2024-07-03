import { TagTemplate } from './Tag.class.js'
import { htmlInterpolationToDomMeta } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { getStringsId } from './getStringsId.function.js'
import { isLastRunMatched } from './isLastRunMatched.function.js'
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { DomMetaMap, ValuePos } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { replacePlaceholders } from '../interpolations/optimizers/replacePlaceholders.function.js'
import { deepClone } from '../deepFunctions.js'
import { restorePlaceholders } from '../interpolations/optimizers/restorePlaceholders.function.js'

const lastRuns: {[index: number]: TagTemplate} = {}

/** Converts strings & values into dom meta */
export function getDomMeta(
  strings: string[],
  values: unknown[],
): DomMetaMap {
  const stringId = getStringsId(strings, values)
  const lastRun = lastRuns[stringId]
  const matches = lastRun && isLastRunMatched(strings, values, lastRun)
  
  if(matches) {
    const domMetaMap: DomMetaMap = lastRun.domMetaMap as DomMetaMap
    return domMetaMap
  }

  const domMeta = htmlInterpolationToDomMeta(strings, values)
  const map = replacePlaceholders(domMeta, values.length)

  // Restore any sanitized placeholders in text nodes
  restorePlaceholders(map.domMeta)

  const template = {
    interpolation: undefined as any,
    string: undefined as any,
    strings,
    values,
  
    domMetaMap: map
  }

  lastRuns[stringId] = template

  return map
}
