import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { ValueTypes } from "../../tag/ValueTypes.enum.js";
import { Attribute, ObjectChildren, ObjectElement, ObjectText } from "./ObjectNode.types.js";

export function replacePlaceholders(
  elements: (ObjectElement | ObjectText)[],
  values: unknown[],
) {
  // const rtnElements: (ObjectElement | ObjectText)[] = []
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    // const element = {...elements[i]} // ???
    
    // rtnElements.push(element)
    
    // TODO: We most likely do not need to replace attributes
    if ('attributes' in element) {
      element.attributes = processAttributes(element.attributes, values)
    }

    if ('children' in element) {
      // const children = [...element.children as ObjectChildren];
      const children = element.children as ObjectChildren

      replacePlaceholders(children, values)
      element.children = children

      // Remove empty children array
      if (element.children.length === 0) {
        delete element.children;
      }
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

  const placeholderRegex = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'g');
  let match;

  while ((match = placeholderRegex.exec(textContent)) !== null) {
    const wIndex = parseInt(match[1], 10);
    const examine = !isNaN(wIndex) && wIndex < values.length
    if (examine) {
      const varContent = variablePrefix + wIndex + variableSuffix;
      const before = textContent.slice(0, match.index);
      const after = textContent.slice(match.index + varContent.length);
      let value = values[wIndex]

      if(value instanceof Array) {
        value = value.map((x, index) => {
          if(x?.tagJsType === ValueTypes.dom) {
            const domClone = [...x.dom]
            const elements = replacePlaceholders(domClone, x.values)
            return domClone
          }

          return x
        })
      }

      // TODO: I don't think we need three adds?
      children.splice(index, 1, {
        nodeName: 'text',
        textContent: before
      }, {
        nodeName: 'text',
        textContent: '',
        value,
      }, {
        nodeName: 'text',
        textContent: after
      });
      
      textContent = after;
      placeholderRegex.lastIndex = 0; // Reset regex index due to split
      index += 2; // Skip the newly inserted elements
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