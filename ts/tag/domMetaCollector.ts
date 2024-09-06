// taggedjs-no-compile

import { TagTemplate } from './Tag.class.js'
import { htmlInterpolationToDomMeta, ParsedHtml } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { getStringsId } from './getStringsId.function.js'
import { isLastRunMatched } from './isLastRunMatched.function.js'
import { DomMetaMap, ValuePos } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { replacePlaceholders } from '../interpolations/optimizers/replacePlaceholders.function.js'
import { restorePlaceholders } from '../interpolations/optimizers/restorePlaceholders.function.js'

const lastRuns: {[index: number]: TagTemplate} = {}

/** Converts strings & values into dom meta */
export function getDomMeta(
  strings: string[],
  values: unknown[],
): ParsedHtml {
  const stringId = getStringsId(strings)
  const lastRun = lastRuns[stringId]
  const matches = lastRun && isLastRunMatched(strings, values, lastRun)
  
  if(matches) {
    return lastRun.domMetaMap as DomMetaMap
  }

  const domMeta = htmlInterpolationToDomMeta(strings, values)
  const map = replacePlaceholders(domMeta, values.length)
  
  // Restore any sanitized placeholders in text nodes
  restorePlaceholders(map)
  
  const template: TagTemplate = {
    interpolation: undefined as any,
    string: undefined as any,
    strings,
    values,
  
    domMetaMap: map,
  }

  lastRuns[stringId] = template

  return map
}
