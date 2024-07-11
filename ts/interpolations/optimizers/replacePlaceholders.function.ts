import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { Attribute, ObjectText } from "./ObjectNode.types.js";
import { DomMetaMap, ObjectChildren, ValuePos } from "./exchangeParsedForValues.function.js";
import { OneUnparsedHtml, ParsedHtml, UnparsedHtml } from "./htmlInterpolationToDomMeta.function.js";

const placeholderRegex = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'g');

export function replacePlaceholders(
  dom: UnparsedHtml,
  valueCount: number,
  valuePositions: ValuePos[] = [],
  currentTail: (string | number)[] = [],
): ParsedHtml {
  const elements = dom

  for (let i = 0; i < elements.length; i++) {
    const loopTail: (string | number)[] = [...currentTail, i]

    const element = elements[i]
    if ('attributes' in element) {
      const attrs = element.attributes as Attribute[]
      element.attributes = processAttributes(attrs, valueCount)
    }

    if ('children' in element) {
      const children = element.children as ObjectChildren
      const innerLoopTail: (string | number)[] = [...loopTail, 'children']
      element.children = replacePlaceholders(children, valueCount, valuePositions, innerLoopTail)
    }

    i = examineChild(element, valueCount, elements, i)
  }

  return elements as ParsedHtml
}

function examineChild(
  child: OneUnparsedHtml,
  valueCount: number,
  children: UnparsedHtml,
  index: number,
): number {
  if (child.nodeName !== 'text') {
    return index;
  }

  const textChild = child as ObjectText;
  let textContent = textChild.textContent;

  if (typeof textContent !== 'string') {
    return index;
  }

  let match
  while ((match = placeholderRegex.exec(textContent)) !== null) {
    const secondMatch = match[1]
    const wIndex = parseInt(secondMatch, 10);
    const examine = !isNaN(wIndex) && wIndex < valueCount
    if (examine) {
      const varContent = variablePrefix + wIndex + variableSuffix
      const after = textContent.slice(match.index + varContent.length)

      children.splice(index, 1, ...[{
        nodeName: 'text',
        value: wIndex
      }])
      
      textContent = after;
      placeholderRegex.lastIndex = 0; // Reset regex index due to split
    }
  }

  textChild.textContent = textContent;

  return index
}

function processAttributes(
  attributes: Attribute[],
  valueCount: number,
): Attribute[] {
  return attributes.map(([key, value]) => {
    if (key.startsWith(variablePrefix)) {
      const index = parseInt(key.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < valueCount) {
        return [{tagJsVar: index}]
      }
    }

    if (typeof value === 'string' && value.startsWith(variablePrefix)) {
      const index = parseInt(value.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < valueCount) {
        return [key, {tagJsVar: index}]
      }
    }

    return [key, value]
  })
}
