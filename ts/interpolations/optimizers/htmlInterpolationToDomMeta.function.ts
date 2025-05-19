import { variablePrefix, variableSuffix } from "../../tag/getDomTag.function.js"
import { parseHTML } from "./parseHTML.function.js"
import { ParsedHtml } from "./types.js"

const fragReplacer = /(^:tagvar\d+:|:tagvar\d+:$)/g
const safeVar = '__safeTagVar'

/** Run only during compile step OR when no compile step occurred at runtime */
export function htmlInterpolationToDomMeta(
  strings: string[],
  values: unknown[],
): ParsedHtml {
  htmlInterpolationToPlaceholders(strings, values)
  
  // Parse the modified fragments
  const htmlString = htmlInterpolationToPlaceholders(strings, values).join('')
  const domMeta = parseHTML(htmlString)

  return domMeta
}

export function htmlInterpolationToPlaceholders(
  strings: string[],
  values: unknown[]
) {
  // Sanitize placeholders in the fragments
  const sanitizedFragments = sanitizePlaceholders(strings)

  // Add placeholders to the fragments
  return  addPlaceholders(
    sanitizedFragments, values,
  )
}

function sanitizePlaceholders(fragments: string[]) {
  return fragments.map(santizeFragment)
}

function santizeFragment(fragment: string) {
  return fragment.replace(
    fragReplacer,
    (match, index) => safeVar + index)
}

function addPlaceholders(
  strings: string[],
  values: any[],
) {

  const results = []
  
  for (let index=0; index < strings.length; ++index) {
    const fragment = strings[index]
    if (index < values.length) {
      results.push(fragment + variablePrefix + index + variableSuffix)
      continue
    }
    results.push(fragment)
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
