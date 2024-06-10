import { interpolateAttributes } from './interpolateAttributes.js'
import { interpolateToTemplates } from './interpolations.js'
import { interpolateContentTemplates } from './interpolateContentTemplates.js'
import { Context, TagTemplate, escapeSearch, variablePrefix } from '../tag/Tag.class.js'
import { Counts, InterpolateComponentResult, Template } from './interpolateTemplate.js'
import { Support } from '../tag/Support.class.js'

export type InterpolateOptions = {
  counts: Counts
}

/** Review elements within an element */
export function interpolateElement(
  fragment: DocumentFragment,
  template: Template, // element containing innerHTML to review interpolations
  context: Context, // variables used to evaluate
  interpolatedTemplates: TagTemplate,
  ownerSupport: Support,
  options: InterpolateOptions,
): InterpolateComponentResult[] {
  const tagComponents: InterpolateComponentResult[] = []
  const result = interpolatedTemplates.interpolation
  // const template = container.children[0] as HTMLTemplateElement
  const children = template.content.children

  if(result.keys.length) {
    const nextTagComponents = interpolateContentTemplates(
      context,
      ownerSupport,
      options,
      children,
      fragment,
    )
    tagComponents.push(...nextTagComponents)
  }

  interpolateAttributes(template, context, ownerSupport)
  processChildrenAttributes(children, context, ownerSupport)

  return tagComponents
}

function processChildrenAttributes(
  children: HTMLCollection,
  context: Context,
  ownerSupport: Support,
) {
  for (let index=children.length-1; index >= 0; --index) {
    const child = children[index]
    interpolateAttributes(child, context, ownerSupport)
  
    if(child.children) {
      processChildrenAttributes(child.children, context, ownerSupport)
    }
  }
}

export function interpolateString(string: string) {
  const result = interpolateToTemplates(string)
  result.string = result.string.replace(escapeSearch, variablePrefix)
  return result
}
