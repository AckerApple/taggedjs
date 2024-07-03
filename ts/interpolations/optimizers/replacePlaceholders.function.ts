import { deepClone } from "../../deepFunctions.js";
import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { TagJsSubject } from "../../tag/update/TagJsSubject.class.js";
import { Attribute, ObjectChildren, ObjectElement, ObjectText } from "./ObjectNode.types.js";
import { DomMetaMap, ValuePos } from "./exchangeParsedForValues.function.js";

const placeholderRegex = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'g');

export function replacePlaceholders(
  dom: (ObjectElement | ObjectText)[],
  valueCount: number,
  valuePositions: ValuePos[] = [],
  currentTail: (string | number)[] = [],
): DomMetaMap {
  // const elements = deepClone( dom )
  const elements = dom

  for (let i = 0; i < elements.length; i++) {
    const loopTail: (string | number)[] = [...currentTail, i]

    const element = elements[i]
    if ('attributes' in element) {
      const attrs = element.attributes as Attribute[]
      element.attributes = processAttributes(attrs, valueCount, loopTail, valuePositions)
    }

    if ('children' in element) {
      const children = element.children as ObjectChildren
      const innerLoopTail: (string | number)[] = [...loopTail, 'children']
      element.children = replacePlaceholders(children, valueCount, valuePositions, innerLoopTail).domMeta
    }

    i = examineChild(element, valueCount, elements, i, loopTail, valuePositions)
  }

  return {domMeta: elements, pos: valuePositions}
}

function examineChild(
  child: ObjectElement | ObjectText,
  valueCount: number,
  children: (ObjectElement | ObjectText)[],
  index: number,
  currentTail: (string | number)[] = [],
  valuePositions: ValuePos[],
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
      const newPos = {pos: [...currentTail, 'value']}
      valuePositions[wIndex] = newPos

      children.splice(index, 1, ...[{
        nodeName: 'text',
        // value: varContent,
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
  currentTail: (string | number)[] = [],
  valuePositions: ValuePos[]
): Attribute[] {
  return attributes.map(([key, value], attrIndex) => {
    if (key.startsWith(variablePrefix)) {
      const index = parseInt(key.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < valueCount) {
        valuePositions[index] = {isAttr: true, pos: [...currentTail, 'attributes', attrIndex, 0]}
        return [key]
      }
    }

    if (typeof value === 'string' && value.startsWith(variablePrefix)) {
      const index = parseInt(value.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < valueCount) {
        valuePositions[index] = {isAttr: true, pos: [...currentTail, 'attributes', attrIndex, 1]} as any
      }
    }

    return [key, value]
  })
}
