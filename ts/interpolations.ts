// support arrow functions in attributes
export const interpolateReplace = /(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g

// stops after arrow function
// export const interpolateReplace = /(?:<[^>]*>)|({__tagvar[^}]+})/g

export type InterpolatedTemplates = {
  string: string
  keys: string[]
}

/** replaces ${x} with <template id="x-start"></template><template id="x-end"></template> */
export function interpolateToTemplates(
  template: string,
): InterpolatedTemplates {
  const keys: string[] = []
  const string = template.replace(interpolateReplace, (match, expression) => {
    if (match.startsWith('<')) {
      // If the match is an HTML tag, don't replace
      return match
    }
    
    const noBraces = expression.substring(1, expression.length-1)
    const id = noBraces
    keys.push(id)
    return `<template interpolate end id="${id}"></template>`
  })

  return { string, keys }
}
