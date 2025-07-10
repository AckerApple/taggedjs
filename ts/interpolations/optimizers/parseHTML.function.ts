import { Attribute, DomObjectElement, ObjectElement, ObjectText } from "./ObjectNode.types.js"
import { variablePrefix, variableSuffix } from "../../tag/DomTag.type.js"
import { isSpecialAttr } from "../attributes/isSpecialAttribute.function.js"
import { ParsedHtml } from "./types.js"
import { fakeTagsRegEx, findRealTagsRegEx } from "./htmlInterpolationToDomMeta.function.js"
import { placeholderRegex } from "../../render/attributes/getTagVarIndex.function.js"

const fragFindAny = /(:tagvar\d+:)/
const ondoubleclick = 'ondoubleclick'
const regexAttr = /([:_a-zA-Z0-9\-.]+)\s*(?:=\s*"([^"]*)"|=\s*(\S+))?/g;
const regexTagOrg = /<\/?([a-zA-Z0-9-]+)((?:\s+[a-zA-Z_:*][\w:.-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)+\s*|\s*)\/?>/g;

/** Main start of string parsing */
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

        for (let textContent of textVarMatches) {
          if(textContent.startsWith(variablePrefix) && textContent.search(fragFindAny) >= 0) {
            // if its not fake then lets now consider this a real variable
            if(textContent.search(fakeTagsRegEx) === -1) {
              textContent = variablePrefix + (++valueIndex) + variableSuffix
            }
          }

          pushTextTo(currentElement, elements, textContent)
        }
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
      valueIndex = parseAttrString(
        attrMatch,
        valueIndex,
        valuePositions,
        attributes,
      )
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
      for (const textContent of textVarMatches) {
        if(textContent.startsWith(variablePrefix)) {
          ++valueIndex
        }
        pushTextTo(currentElement, elements, textContent)
      }
    }
  }

  return elements;
}

const removeCommentRegX = new RegExp('(<!--[\\s\\S]*?-->)', 'g')
function preprocessTagsInComments(html: string) {
  // Use a regex to find all HTML comments
  return html.replace(removeCommentRegX, function(match) {
      // For each comment found, replace < and > inside it
      return match.replace(/\[l t\]/g, '[l&nbsp;t]').replace(/\[g t\]/g, '[g&nbsp;t]').replace(/</g, '[l t]').replace(/>/g, '[g t]');
  })
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

function pushTextTo(
  currentElement: ObjectElement | null,
  elements: ParsedHtml,
  textContent: string
) {
  const textNode: ObjectText = {
    nn: 'text', // nodeName
    tc: postProcessTagsInComments(textContent), // textContent
  }

  pushTo(currentElement, elements, textNode)
}

/** TODO: This has got to be too expensive */
function postProcessTagsInComments(html: string) {
  // Use a regex to find all segments that look like processed comments
  return html.replace(/(\[l t\]!--[\s\S]*?--\[g t\])/g, function(match) {
      // For each processed comment found, replace *lt* and *gt* back to < and >
      return match.replace(/\[l t\]/g, '<').replace(/\[g t\]/g, '>').replace(/\[l&nbsp;t\]/g, '[l t]').replace(/\[g&nbsp;t\]/g, '[g t]')
  });
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

function splitByTagVar(inputString: string) {
  // Split the string using the regular expression, keep delimiters in the output
  const parts = inputString.split(fragFindAny)

  // Filter out any empty strings from the results
  const filteredParts = parts.filter(notEmptyStringMapper)

  return filteredParts;
}

function notEmptyStringMapper(part: string) {
  return part !== ''
}

function parseAttrString(
  attrMatch: any[],
  valueIndex: number,
  valuePositions: any[],
  attributes: any[],
) {
  const attrName = attrMatch[1] || attrMatch[3] || attrMatch[5];
  const attrChoice = attrMatch[2] || attrMatch[4] || attrMatch[6]
  let attrValue = attrChoice

  if (attrName === undefined) {
    return valueIndex
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
      return valueIndex
    }
    
    const startMatched = attrMatch[0].startsWith(attrName)
    const standAloneAttr = startMatched && attrMatch[0].slice(attrName.length, attrMatch[0].length).search(/\s+$/) >= 0
    if(standAloneAttr) {
      attributes.push([fixedName])
      return valueIndex
    }

    const wholeValue = attrMatch[3] as string
    const isFakeTag = wholeValue.search(fakeTagsRegEx) >= 0
    if(isFakeTag) {
      attrValue = wholeValue
      // to restore: wholeValue.replace(fakeTagsRegEx,variablePrefix+'$1$3$4'+variableSuffix)
      const attrSet: Attribute = [fixedName, attrValue]
      attributes.push(attrSet)
      return valueIndex
    } else {
      const valueName = variablePrefix + (++valueIndex) + variableSuffix
      attrValue = valueName
    }
  }

  if(!notEmpty) {
    attrValue = attrMatch[2]
  }

  // concat attributes as array
  const attrValueSplit =  (attrValue as string).split(findRealTagsRegEx).filter((x: string) => x.length > 0)
  if(attrValueSplit.length > 1) {
    attrValue = attrValueSplit
    attrValueSplit.forEach((value) => {
      if(value.search(placeholderRegex) >= 0) {
        ++valueIndex
      }
    })
  }

  const attrSet: Attribute = [fixedName, attrValue]
  const isSpecial = isSpecialAttr(lowerName) // check original name for "oninit" or "autofocus"
  if(isSpecial) {
    attrSet.push(isSpecial)
  }

  // force style to be first so other style manipulating attributes do not get overwritten
  if(fixedName === 'style') {
    // console.log('style to the front', {attrSet, attributes, valuePositions})
    attributes.unshift(attrSet)
    return valueIndex
  }

  attributes.push(attrSet)
  return valueIndex
}