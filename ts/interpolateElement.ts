import { interpolateAttributes } from "./interpolateAttributes.js"
import { interpolateToTemplates } from "./interpolations.js"
import { interpolateContentTemplates } from "./interpolateContentTemplates.js"
import { Context, Tag, TagTemplate, escapeSearch, variablePrefix } from "./Tag.class.js"
import { Clones } from "./Clones.type.js"
import { Counts } from "./interpolateTemplate.js"

export type InterpolateOptions = {
  /** make the element go on document */
  forceElement?: boolean
  counts: Counts
}

export function interpolateElement(
  element: Element,
  context: Context, // variables used to evaluate
  interpolatedTemplates: TagTemplate,
  tagOwner: Tag,
  options: InterpolateOptions,
): Clones {
  const clones = []
  const result = interpolatedTemplates.interpolation
  const template = element.children[0] as HTMLTemplateElement
  const children = template.content.children

  if(result.keys.length) {
    const nextClones = interpolateContentTemplates(element, context, tagOwner, options, children)
    clones.push( ...nextClones )
  }

  interpolateAttributes(element, context, tagOwner)
  processChildrenAttributes(children, context, tagOwner)

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

export function interpolateString(string: string) {
  const result = interpolateToTemplates(string)
  result.string = result.string.replace(escapeSearch, variablePrefix)
  return result
}
