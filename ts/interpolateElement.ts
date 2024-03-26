import { interpolateAttributes } from "./interpolateAttributes"
import { interpolateToTemplates } from "./interpolations"
import { InterpolatedContentTemplates, interpolateContentTemplates } from "./interpolateContentTemplates"
import { Context, Tag, TagTemplate, escapeSearch, variablePrefix } from "./Tag.class"
import { Clones } from "./Clones.type"
import { Counts, InterpolateComponentResult } from "./interpolateTemplate"

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
  test = false
): InterpolatedContentTemplates {
  const clones: Clones = []
  const tagComponents: InterpolateComponentResult[] = []
  const result = interpolatedTemplates.interpolation
  const template = container.children[0] as HTMLTemplateElement
  const children = template.content.children

  if(result.keys.length) {
    const {clones: nextClones, tagComponents: nextTagComponents} = interpolateContentTemplates(
      container, context, tagOwner, options, children
    )
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
  new Array(...children).forEach(child => {
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
