import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { ValueTypes } from "../../tag/ValueTypes.enum.js";
import { Attribute, ObjectChildren, ObjectElement, ObjectText } from "./ObjectNode.types.js";

const placeholderRegex = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'g');

export function replacePlaceholders(
  elements: (ObjectElement | ObjectText)[],
  values: unknown[],
) {
  // const rtnElements: (ObjectElement | ObjectText)[] = []
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    // TODO: We most likely do not need to replace attributes
    if ('attributes' in element) {
      const attrs = element.attributes as Attribute[]
      element.attributes = processAttributes(attrs, values)
    }

    if ('children' in element) {
      const children = element.children as ObjectChildren
      replacePlaceholders(children, values)
      element.children = children
    }

    i = examineChild(element, values, elements, i)
  }
}

function examineChild(
  child: ObjectElement | ObjectText,
  values: any[],
  children: (ObjectElement | ObjectText)[],
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

  // const matches = textContent.substring(0, variablePrefix.length) === variablePrefix
  // if (matches) {
  let match
  while ((match = placeholderRegex.exec(textContent)) !== null) {
    const wIndex = parseInt(match[1], 10);
  
    // const numString = textContent.substring(textContent.length-2, textContent.length-1)
    // numString = match[1]
    // const wIndex = parseInt(numString, 10)
    const examine = !isNaN(wIndex) && wIndex < values.length
    if (examine) {
      const varContent = variablePrefix + wIndex + variableSuffix
      const after = textContent.slice(match.index + varContent.length)
      let value = values[wIndex]

      if(value instanceof Array) {
        value = value.map((x, index) => {
          if(x?.tagJsType === ValueTypes.dom) {
            const domClone = [...x.dom]
            replacePlaceholders(domClone, x.values)
            return domClone
          }

          return x
        })
      }
      
      children.splice(index, 1, ...[{
        nodeName: 'text',
        value,
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
  values: unknown[]
): Attribute[] {
  return attributes.map(([key, value]) => {
    if (key.startsWith(variablePrefix)) {
      const index = parseInt(key.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < values.length) {
        return [values[index]] // the name is the value
      }
    }

    if (typeof value === 'string' && value.startsWith(variablePrefix)) {
      const index = parseInt(value.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < values.length) {
        value = values[index];
      }
    }

    return [key, value]
  })
}
