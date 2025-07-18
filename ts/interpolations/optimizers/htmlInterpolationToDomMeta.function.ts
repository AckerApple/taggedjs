import { variablePrefix, variableSuffix } from "../../tag/DomTag.type.js"
import { parseHTML } from "./parseHTML.function.js"
import { ParsedHtml } from "./types.js"

export const realTagsRegEx = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'gi')
export const findRealTagsRegEx = new RegExp('(' + variablePrefix + '\\d+' + variableSuffix+')', 'gi')

// without last letter
const shortFront = variablePrefix.slice(0, variablePrefix.length-1)

export const fakeTagsRegEx = new RegExp(shortFront + '&#x72;(\\d+)' + variableSuffix, 'gi')

// variable prefix minus one letter and then the letter "r" as hex
const replacement = shortFront + '&#x72;$1' + variableSuffix

/** Run only during compile step OR when no compile step occurred at runtime */
export function htmlInterpolationToDomMeta(
  strings: string[],
  values: unknown[],
): ParsedHtml { 
  // Parse the modified fragments
  const htmlString = htmlInterpolationToPlaceholders(strings, values).join('')
  const domMeta = parseHTML(htmlString)

  return domMeta
}

export function htmlInterpolationToPlaceholders(
  strings: string[],
  values: unknown[]
): string[] {
  // Sanitize placeholders in the fragments
  const sanitizedFragments = strings
  // const sanitizedFragments = sanitizePlaceholders(strings)

  // Add placeholders to the fragments
  return addPlaceholders(
    sanitizedFragments, values,
  )
}

function addPlaceholders(
  strings: string[],
  values: any[],
) {

  const results = []
  
  for (let index=0; index < strings.length; ++index) {
    const fragment = strings[index]
    const safeFragment = fragment.replace(realTagsRegEx, replacement)
    if (index < values.length) {
      results.push(safeFragment + variablePrefix + index + variableSuffix)
      continue
    }
    results.push(safeFragment)
  }

  balanceArrayByArrays(results, strings, values)

  return results
}

export function balanceArrayByArrays(
  results: unknown[],
  strings: string[],
  values: unknown[],
) {
  const diff = values.length - strings.length
  if(diff > 0) {
    for (let x = diff; x > 0; --x) {
      results.push( variablePrefix + (strings.length + x - 1) + variableSuffix )
    }
  }
}
