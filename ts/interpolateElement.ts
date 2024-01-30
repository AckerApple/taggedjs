import { interpolateAttributes } from "./interpolateAttributes.js"
import { interpolateToTemplates } from "./interpolations.js"
import { interpolateContentTemplates } from "./interpolateContentTemplates.js"
import { Context, Tag, escapeSearch, variablePrefix } from "./Tag.class.js"
import { Clones } from "./Clones.type.js"

export type InterpolateOptions = {
  /** make the element go on document */
  forceElement?: boolean
  depth: number
}

export function interpolateElement(
  element: Element,
  context: Context, // variables used to evaluate
  tag: Tag,
  options: InterpolateOptions,
): Clones {
  const clones = []
  const result = interpolateElementChild(element, options.depth + 1)

  if(result.keys.length) {
    const nextClones = interpolateContentTemplates(element, context, tag, options)
    clones.push( ...nextClones )
  }

  interpolateAttributes(element, context, tag)
  processChildrenAttributes(element.children, context, tag)

  return clones
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
