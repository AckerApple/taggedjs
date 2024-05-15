import { interpolateAttributes } from "./interpolateAttributes"
import { interpolateToTemplates } from "./interpolations"
import { InterpolatedContentTemplates, interpolateContentTemplates } from "./interpolateContentTemplates"
import { Context, TagTemplate, escapeSearch, variablePrefix } from "../tag/Tag.class"
import { Clones } from "./Clones.type"
import { Counts, InterpolateComponentResult } from "./interpolateTemplate"
import { TagSupport } from "../tag/TagSupport.class"

export type InterpolateOptions = {
  /** make the element go on document */
  forceElement?: boolean
  counts: Counts
}

/** Review elements within an element */
export function interpolateElement(
  container: Element, // element containing innerHTML to review interpolations
  context: Context, // variables used to evaluate
  interpolatedTemplates: TagTemplate,
  ownerSupport: TagSupport,
  options: InterpolateOptions,
): InterpolatedContentTemplates {
  const clones: Clones = []
  const tagComponents: InterpolateComponentResult[] = []
  const result = interpolatedTemplates.interpolation
  const template = container.children[0] as HTMLTemplateElement
  const children = template.content.children

  if(result.keys.length) {
    const {clones: nextClones, tagComponents: nextTagComponents} = interpolateContentTemplates(
      container,
      context,
      ownerSupport,
      options,
      children
    )
    clones.push( ...nextClones )
    tagComponents.push( ...nextTagComponents )
  }

  interpolateAttributes(container, context, ownerSupport)
  processChildrenAttributes(children, context, ownerSupport)

  return {clones, tagComponents}
}

function processChildrenAttributes(
  children: HTMLCollection,
  context: Context,
  ownerSupport: TagSupport,
) {
  new Array(...children).forEach(child => {
    interpolateAttributes(child, context, ownerSupport)

    if(child.children) {
      processChildrenAttributes(child.children, context, ownerSupport)
    }
  })
}

export function interpolateString(string: string) {
  const result = interpolateToTemplates(string)
  result.string = result.string.replace(escapeSearch, variablePrefix)
  return result
}
