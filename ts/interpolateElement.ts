import { interpolateAttributes } from "./interpolateAttributes.js"
import { interpolateToTemplates } from "./interpolations.js"
import { InterpolatedContentTemplates, interpolateContentTemplates } from "./interpolateContentTemplates.js"
import { Context, Tag, TagTemplate, escapeSearch, variablePrefix } from "./Tag.class.js"
import { Clones } from "./Clones.type.js"
import { Counts, InterpolateComponentResult } from "./interpolateTemplate.js"

export type InterpolateOptions = {
  /** make the element go on document */
  forceElement?: boolean
  counts: Counts
}

/** Review elements within an element */
export function interpolateElement(
  container: Element,
  context: Context, // variables used to evaluate
  interpolatedTemplates: TagTemplate,
  tagOwner: Tag,
  options: InterpolateOptions,
): InterpolatedContentTemplates {
  const clones: Clones = []
  const tagComponents: InterpolateComponentResult[] = []
  const result = interpolatedTemplates.interpolation
  const template = container.children[0] as HTMLTemplateElement
  const children = template.content.children

  if(result.keys.length) {
    const {clones: nextClones, tagComponents: nextTagComponents} = interpolateContentTemplates(container, context, tagOwner, options, children)
    clones.push( ...nextClones )
    tagComponents.push( ...nextTagComponents )
  }

  interpolateAttributes(container, context, tagOwner)
  processChildrenAttributes(children, context, tagOwner)

  return {clones, tagComponents}
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
