import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { ObjectChildren, ObjectElement, ObjectText } from "./ObjectNode.types.js";
export const safeVar = '__safeTagVar'

export function restorePlaceholders(elements: ObjectChildren) {
  elements.forEach(traverseAndRestore);
}

const safeReplacer = /__safeTagVar(\d+)/g

function traverseAndRestore(element: ObjectElement | ObjectText) {
  if ('attributes' in element) {
    element.attributes = element.attributes ? element.attributes.map(attr => {
      if(attr.length === 1) {
        return attr
      }
      
      let [key, value] = attr
      if (typeof value === 'string' && value.startsWith(safeVar)) {
        const index = parseInt(value.replace(safeVar, ''), 10)
        value = variablePrefix + index + variableSuffix
      }
      return [key, value]
    }) : []
  }

  if ('children' in element) {
    const children = element.children as ObjectChildren
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as ObjectText
      if (child.nodeName === 'text') {
        if(typeof child.textContent !== 'string') {
          return
        }

        child.textContent = child.textContent.replace(safeReplacer, (_match, index) =>
          variablePrefix + index + variableSuffix
        )
      }
      traverseAndRestore(child)
    }

    // Remove empty children array
    if (children.length === 0) {
      delete element.children
    }
  }
}
