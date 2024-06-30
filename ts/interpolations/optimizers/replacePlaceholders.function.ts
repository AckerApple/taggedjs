import { TagSubject } from "../../subject.types.js";
import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { ValueTypes } from "../../tag/ValueTypes.enum.js";
import { TagJsSubject } from "../../tag/update/TagJsSubject.class.js";
import { Attribute, ObjectChildren, ObjectElement, ObjectText } from "./ObjectNode.types.js";
import { ValuePos } from "./exchangeParsedForValues.function.js";

const placeholderRegex = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'g');

export function replacePlaceholders(
  elements: (ObjectElement | ObjectText)[],
  values: unknown[],
  valuePositions: ValuePos[] = [],
  currentTail: (string | number)[] = [],
) {
  for (let i = 0; i < elements.length; i++) {
    const loopTail: (string | number)[] = [...currentTail, i]

    const element = elements[i]
    if ('attributes' in element) {
      const attrs = element.attributes as Attribute[]
      element.attributes = processAttributes(attrs, values, loopTail, valuePositions)
    }

    if ('children' in element) {
      const children = element.children as ObjectChildren
      const innerLoopTail: (string | number)[] = [...loopTail, 'children']
      replacePlaceholders(children, values, valuePositions, innerLoopTail)
      element.children = children
    }

    i = examineChild(element, values, elements, i, loopTail, valuePositions)
  }
}

function examineChild(
  child: ObjectElement | ObjectText,
  values: any[],
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
    const examine = !isNaN(wIndex) && wIndex < values.length
    if (examine) {
      const varContent = variablePrefix + wIndex + variableSuffix
      const after = textContent.slice(match.index + varContent.length)
      let value = values[wIndex] as TagJsSubject<any>
      const array = value._value
      const isArray = array instanceof Array // value instanceof Array
      
      if(isArray) {
/*
        array.forEach((x: any, index: number) => {
          if(x?.tagJsType === ValueTypes.dom) {
            const domClone = [...x.dom]
            // replacePlaceholders(domClone, x.values, newValuePositions, loopTail)
            return domClone
          }

          return x
        })
*/
      }

      const newPos = {pos: [...currentTail, 'value'], value}
      if(valuePositions[wIndex] != undefined) {
        console.log('valuePositions[wIndex]', {
          wIndex,
          vLen: valuePositions.length,
          vPos: valuePositions[wIndex],
          varContent,
          secondMatch,
          values,
          // match,
          // child,
          // children,

          newPos,
          // equal: valuePositions[wIndex].value === value
        })
        // throw new Error('already defined?')
      }

      // valuePositions.push({pos: [...currentTail, 'value']})
      valuePositions[wIndex] = newPos
      children.splice(index, 1, ...[{
        nodeName: 'text',
        value,
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
  values: unknown[],
  currentTail: (string | number)[] = [],
  valuePositions: ValuePos[]
): Attribute[] {
  return attributes.map(([key, value], attrIndex) => {
    if (key.startsWith(variablePrefix)) {
      const index = parseInt(key.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < values.length) {
        console.log('key0', {key,index, valueLength: values.length})
        const value = values[index]
        valuePositions[index] = {value, isAttr: true, pos: [...currentTail, 'attributes', attrIndex, 0]}
        return [value] // the name is the value
        // return [key]
      }
    }

    if (typeof value === 'string' && value.startsWith(variablePrefix)) {
      const index = parseInt(value.replace(variablePrefix, ''), 10)
      if (!isNaN(index) && index < values.length) {
        // console.log('key1', {key,index, value, newValue: values[index], valueLength: values.length})
        value = values[index]
        valuePositions[index] = {key, value, isAttr: true, pos: [...currentTail, 'attributes', attrIndex, 1]} as any
      }
    }

    return [key, value]
  })
}
