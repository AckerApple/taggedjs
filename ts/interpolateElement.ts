import { interpolateAttributes } from "./interpolateAttributes.js"
import { interpolateToTemplates } from "./interpolations.js"
import { interpolateContentTemplates } from "./interpolateContentTemplates.js"
import { Context, Tag, escapeSearch, variablePrefix } from "./Tag.class.js"

export type InterpolateOptions = {
  /** make the element go on document */
  forceElement?: boolean
  depth: number
}

export function interpolateElement(
  element: Element,
  context: Context, // variables used to evaluate
  ownerTag: Tag,
  options: InterpolateOptions,
) {

  const result = interpolateElementChild(element, options.depth + 1)

  if(result.keys.length) {
    interpolateContentTemplates(element, context, ownerTag, options)
  }

  interpolateAttributes(element, context, ownerTag)
  processChildrenAttributes(element.children, context, ownerTag)
}

function processChildrenAttributes(
  children: HTMLCollection,
  context: Context,
  ownerTag: Tag,
) {
  new Array(...children as any).forEach(child => {
    interpolateAttributes(child, context, ownerTag)

    if(child.children) {
      processChildrenAttributes(child.children, context, ownerTag)
    }
  })
}

/** Convert interpolations into template tags */
function interpolateElementChild(
  child: Element,
  depth: number
) {
  const result = interpolateToTemplates(child.innerHTML, {depth})
  result.string = result.string.replace(escapeSearch, variablePrefix)
  child.innerHTML = result.string
  return result
}
