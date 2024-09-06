import { variablePrefix, variableSuffix } from "../../tag/Tag.class.js"
import { isSpecialAttr } from "../attributes/isSpecialAttribute.function.js"
import { Attribute, DomObjectElement, ObjectElement, ObjectText } from "./ObjectNode.types.js"
import { ParsedHtml } from "./types.js"

const ondoubleclick = 'ondoubleclick'
const fragFindAny = /(:tagvar\d+:)/
const fragReplacer = /(^:tagvar\d+:|:tagvar\d+:$)/g
const safeVar = '__safeTagVar'
const regexAttr = /([:_a-zA-Z0-9\-\.]+)\s*(?:=\s*"([^"]*)"|=\s*(\S+))?/g;
const regexTagOrg = /<\/?([a-zA-Z0-9\-]+)((?:\s+[a-zA-Z_:][\w:.\-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)+\s*|\s*)\/?>/g;

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

export function parseHTML(html: string): ParsedHtml {
  const valuePositions: string[][] = [];
  const elements: ParsedHtml = [];
  const stack: ObjectElement[] = [];
  let currentElement: ObjectElement | null = null;
  let valueIndex = -1;
  let position = 0;
  const regexTag = new RegExp(regexTagOrg, 'g');

  html = preprocessTagsInComments(html);

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
        const textVarMatches = splitByTagVar(textContent);

        textVarMatches.forEach(textContent => {
          if(textContent.startsWith(variablePrefix)) {
            textContent = variablePrefix + (++valueIndex) + variableSuffix
          }

          pushTextTo(currentElement, elements, textContent)
        })
      }
    }

    position = tagMatch.index + fullMatch.length;

    if (isClosingTag) {
      currentElement = stack.pop() || null;
      continue;
    }

    const attributes: Attribute[] = [];

    let attrMatch;
    while ((attrMatch = regexAttr.exec(attrString)) !== null) {
      const attrName = attrMatch[1] || attrMatch[3] || attrMatch[5];
      const attrChoice = attrMatch[2] || attrMatch[4] || attrMatch[6]
      let attrValue = attrChoice

      if (attrName === undefined) {
        continue;
      }

      const notEmpty = attrMatch[2] !== ''
      const noValue = attrValue === undefined && notEmpty
      const lowerName = attrName.toLowerCase()
      

      const fixedName = lowerName.startsWith('on') ? cleanEventName(lowerName) : lowerName

      if (noValue) {
        const standAloneVar = attrName.slice(0, variablePrefix.length) === variablePrefix;
  
        if (standAloneVar) {
          const valueName = variablePrefix + (++valueIndex) + variableSuffix
          valuePositions.push(['at', valueName]);
          attributes.push([valueName]); // the name itself is dynamic
          continue
        }
        
        const startMatched = attrMatch[0].startsWith(attrName)
        const standAloneAttr = startMatched && attrMatch[0].slice(attrName.length, attrMatch[0].length).search(/\s+$/) >= 0
        if(standAloneAttr) {
          attributes.push([fixedName])
          continue
        }

        const valueName = variablePrefix + (++valueIndex) + variableSuffix
        attrValue = valueName
      }

      if(!notEmpty) {
        attrValue = attrMatch[2]
      }

      const attrSet: Attribute = [fixedName, attrValue]

      const isSpecial = isSpecialAttr(fixedName)
      if(isSpecial) {
        attrSet.push(isSpecial)
      }

      attributes.push(attrSet)
    }

    const element: ObjectElement = {
      nn: tagName, // nodeName
    };

    if (attributes.length) {
      element.at = attributes;
    }

    if (currentElement) {
      if (!currentElement.ch) {
        currentElement.ch = [];
      }
      currentElement.ch.push(element);
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
      const textVarMatches = splitByTagVar(textContent);
      textVarMatches.forEach(textContent => {
        if(textContent.startsWith(variablePrefix)) {
          ++valueIndex
        }
        return pushTextTo(currentElement, elements, textContent)
      })
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
  elements: ParsedHtml,
  textNode: ObjectText
) {
  if (currentElement) {
    if (!currentElement.ch) {
      currentElement.ch = []
    }
    currentElement.ch.push(textNode)
  } else {
    elements.push(textNode)
  }
}

function pushTextTo(
  currentElement: ObjectElement | null,
  elements: ParsedHtml,
  textContent: string
) {
  const textNode: ObjectText = {
    nn: 'text', // nodeName
    tc: postprocessTagsInComments(textContent), // textContent
  }

  pushTo(currentElement, elements, textNode)
}

const removeCommentRegX = new RegExp('(<!--[\\s\\S]*?-->)', 'g')
function preprocessTagsInComments(html: string) {
  // Use a regex to find all HTML comments
  return html.replace(removeCommentRegX, function(match) {
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

function cleanEventName(eventName: string) {
  if(eventName.startsWith('on')) {
    const couldByDblClick = eventName.length === ondoubleclick.length && eventName === ondoubleclick
    if(couldByDblClick) {
      return 'dblclick'
    }

    return eventName.slice(2, eventName.length)
  }

  return eventName
}