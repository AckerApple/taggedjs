// taggedjs-no-compile

import { htmlInterpolationToDomMeta } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { replacePlaceholders } from '../interpolations/optimizers/replacePlaceholders.function.js'
import { DomMetaMap } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { isLastRunMatched } from './isLastRunMatched.function.js'
import { getStringsId } from './getStringsId.function.js'
import { ParsedHtml } from '../interpolations/index.js'
import { TagTemplate } from './getDomTag.function.js'

const lastRuns: {[index: number]: TagTemplate} = {}

/** Merges strings & values with dom meta into a html array tree */
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
