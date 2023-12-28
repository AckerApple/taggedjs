import { interpolateAttributes } from "./interpolateAttributes.js"
import { interpolateToTemplates } from "./interpolations.js"
import { interpolateContentTemplates } from "./interpolateContentTemplates.js"
import { Context, Tag, escapeSearch, variablePrefix } from "./Tag.class.js"

/**
 * 
 * @param {*} element 
 * @param {*} context 
 * @param {Tag} ownerTag 
 */
export function interpolateElement(
  element: Element,
  context: Context, // variables used to evaluate
  ownerTag: Tag,
) {
  const result = interpolateElementChild(element)

  if(result.keys.length) {
    interpolateContentTemplates(element, context, ownerTag)
  }

  interpolateAttributes(element, context, ownerTag)

  function processChildren(children: HTMLCollection) {
    new Array(...children as any).forEach(child => {
      interpolateAttributes(child, context, ownerTag)

      if(child.children) {
        processChildren(child.children)
      }
    })
  }

  processChildren(element.children)
}

/** Convert interpolations into template tags */
function interpolateElementChild(
  child: Element,
) {
  const result = interpolateToTemplates(child.innerHTML)
  result.string = result.string.replace(escapeSearch, variablePrefix)
  child.innerHTML = result.string
  return result
}
