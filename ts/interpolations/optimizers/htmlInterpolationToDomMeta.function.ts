/* best */

import { variablePrefix, variableSuffix } from "../../tag/Tag.class.js"
import { Attribute, DomObjectElement, ObjectElement, ObjectText } from "./ObjectNode.types.js"

const fragFindAny = /(:tagvar\d+:)/
const fragReplacer = /(^:tagvar\d+:|:tagvar\d+:$)/g
const safeVar = '__safeTagVar'
const regexAttr = /([:_a-zA-Z0-9\-\.]+)\s*(?:=\s*"([^"]*)"|=\s*(\S+))?/g;
const regexTagOrg = /<\/?([a-zA-Z0-9\-]+)([^>]*)>/

export function htmlInterpolationToDomMeta(
  strings: string[],
  values: unknown[],
) {
  // Sanitize placeholders in the fragments
  const sanitizedFragments = sanitizePlaceholders(strings)

  // Add placeholders to the fragments
  const fragmentsWithPlaceholders = addPlaceholders(
    sanitizedFragments, values
  )
  
  // Parse the modified fragments
  const htmlString = fragmentsWithPlaceholders.join('')
  const parsedElements = parseHTML(htmlString)

  return parsedElements
}

function sanitizePlaceholders(fragments: string[]) {
  return fragments.map(fragment =>
    fragment.replace(
      fragReplacer,
      (match, index) => safeVar + index)
  )
}

function addPlaceholders(
  strings: string[],
  values: any[],
) {

  const results = strings.map((fragment, index) => {
    if (index < values.length) {
      return fragment + variablePrefix + index + variableSuffix
    }
    return fragment;
  })

  balanceArrayByArrays(results, strings, values)

  return results
}

function parseHTML(html: string): (DomObjectElement | ObjectText)[] {
  const elements: (DomObjectElement | ObjectText)[] = [];
  const stack: ObjectElement[] = [];
  let currentElement: ObjectElement | null = null;
  let valueIndex = 0;
  let position = 0;
  const regexTag = new RegExp(regexTagOrg, 'g')

  html = preprocessTagsInComments(html)

  while (position < html.length) {
    const tagMatch = regexTag.exec(html);

    if (!tagMatch) {
      break;
    }

    const [fullMatch, tagName, attrString] = tagMatch;
    const isClosingTag = fullMatch.startsWith('</');
    const isSelfClosing = fullMatch.endsWith('/>');

    if (position < tagMatch.index) {
      const textContent = html.slice(position, tagMatch.index);
      if (textContent.trim()) {
        const textVarMatches = splitByTagVar(textContent)
        textVarMatches.forEach(textContent =>
          pushTextTo(currentElement, elements, textContent)
        )
      }
    }

    position = tagMatch.index + fullMatch.length;

    if (isClosingTag) {
      currentElement = stack.pop() || null;
      continue;
    }

    const attributes: Attribute[] = []
    const element: ObjectElement = {
      nodeName: tagName,
      attributes,
    };

    let attrMatch;
    while ((attrMatch = regexAttr.exec(attrString)) !== null) {
      let [_, attrName, attrValueQuoted, attrValueUnquoted] = attrMatch;
      let attrValue = attrValueQuoted || attrValueUnquoted;
      if (attrValue === undefined) {
        const standAloneVar = attrName.slice(0, variablePrefix.length) === variablePrefix

        if(standAloneVar) {
          attributes.push([attrName]) // the name itself is dynamic
          continue
        }
        
        attrValue = variablePrefix + (valueIndex++) + variableSuffix
      }
      
      attributes.push([attrName.toLowerCase(), attrValue])
    }

    if(!attributes.length) {
      delete element.attributes
    }

    if (currentElement) {
      if (!currentElement.children) {
        currentElement.children = [];
      }
      currentElement.children.push(element);
    } else {
      elements.push(element as DomObjectElement);
    }

    if (!isSelfClosing) {
      stack.push(currentElement as ObjectElement);
      currentElement = element;
    }
  }

  if (position < html.length) {
    const textContent = html.slice(position);
    if (textContent.trim()) {
      const textVarMatches = splitByTagVar(textContent)
      textVarMatches.forEach(textContent =>
        pushTextTo(currentElement, elements, textContent)
      )
    }
  }

  return elements;
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

function splitByTagVar(inputString: string) {
  // Split the string using the regular expression, keep delimiters in the output
  const parts = inputString.split(fragFindAny);

  // Filter out any empty strings from the results
  const filteredParts = parts.filter(part => part !== '');

  return filteredParts;
}

function pushTo(
  currentElement: ObjectElement | null,
  elements: (DomObjectElement | ObjectText)[],
  textNode: ObjectText
) {
  if (currentElement) {
    if (!currentElement.children) {
      currentElement.children = []
    }
    currentElement.children.push(textNode)
  } else {
    elements.push(textNode)
  }
}

function pushTextTo(
  currentElement: ObjectElement | null,
  elements: (DomObjectElement | ObjectText)[],
  textContent: string
) {
  const textNode: ObjectText = {
    nodeName: 'text',
    textContent: postprocessTagsInComments(textContent),
  }

  pushTo(currentElement, elements, textNode)
}

function preprocessTagsInComments(html: string) {
  // Use a regex to find all HTML comments
  return html.replace(/(<!--[\s\S]*?-->)/g, function(match) {
      // For each comment found, replace < and > inside it
      return match.replace(/\[l t\]/g, '[l&nbsp;t]').replace(/\[g t\]/g, '[g&nbsp;t]').replace(/</g, '[l t]').replace(/>/g, '[g t]');
  });
}

function postprocessTagsInComments(html: string) {
  // Use a regex to find all segments that look like processed comments
  return html.replace(/(\[l t\]!--[\s\S]*?--\[g t\])/g, function(match) {
      // For each processed comment found, replace *lt* and *gt* back to < and >
      return match.replace(/\[l t\]/g, '<').replace(/\[g t\]/g, '>').replace(/\[l&nbsp;t\]/g, '[l t]').replace(/\[g&nbsp;t\]/g, '[g t]')
  });
}
