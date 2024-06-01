import { interpolateAttributes } from './interpolateAttributes.js'
import { interpolateToTemplates } from './interpolations.js'
import { InterpolatedContentTemplates, interpolateContentTemplates } from './interpolateContentTemplates.js'
import { Context, TagTemplate, escapeSearch, variablePrefix } from '../tag/Tag.class.js'
import { Counts, InterpolateComponentResult } from './interpolateTemplate.js'
import { TagSupport } from '../tag/TagSupport.class.js'
import { InsertBefore } from './InsertBefore.type.js'

export type InterpolateOptions = {
  counts: Counts
}

/** Review elements within an element */
export function interpolateElement(
  container: DocumentFragment, // element containing innerHTML to review interpolations
  context: Context, // variables used to evaluate
  interpolatedTemplates: TagTemplate,
  ownerSupport: TagSupport,
  options: InterpolateOptions,
): InterpolatedContentTemplates {
  const clones: InsertBefore[] = []
  const tagComponents: InterpolateComponentResult[] = []
  const result = interpolatedTemplates.interpolation
  const template = container.children[0] as HTMLTemplateElement
  const children = template.content.children

  if(result.keys.length) {
    const {clones: nextClones, tagComponents: nextTagComponents} = interpolateContentTemplates(
      context,
      ownerSupport,
      options,
      children
    )
    clones.push( ...nextClones )
    tagComponents.push( ...nextTagComponents )
  }

  interpolateAttributes(template, context, ownerSupport)
  processChildrenAttributes(children, context, ownerSupport)

  return {clones, tagComponents}
}

function processChildrenAttributes(
  children: HTMLCollection,
  context: Context,
  ownerSupport: TagSupport,
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
