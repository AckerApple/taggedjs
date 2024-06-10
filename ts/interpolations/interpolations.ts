import { escapeSearch, variablePrefix } from '../tag/Tag.class.js'

// support arrow functions in attributes
export const interpolateReplace = /(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g

export type InterpolatedTemplates = {
  string: string
  keys: string[]
}

export function interpolateString(string: string) {
  const result = interpolateToTemplates(string)
  result.string = result.string.replace(escapeSearch, variablePrefix)
  return result
}

const templateStart = '<template interpolate end id="'
const templateEnd = '"></template>'

/** replaces ${x} with <template id="x-start"></template><template id="x-end"></template> */
function interpolateToTemplates(
  template: string,
): InterpolatedTemplates {
  const keys: string[] = []
  const string = template.replace(interpolateReplace, (match, expression) => {
    // If the match is an HTML tag, don't replace
    if (match.startsWith('<')) {
      return match // this is an attribute
    }
    
    const noBraces = expression.substring(1, expression.length-1)
    const id = noBraces
    keys.push(id)
    return templateStart + id + templateEnd
  })

  return { string, keys }
}
