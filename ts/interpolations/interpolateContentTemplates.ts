import { TagSupport } from '../tag/TagSupport.class.js'
import { InsertBefore } from './InsertBefore.type.js'
import { InterpolateOptions } from'./interpolateElement.js'
import { InterpolateComponentResult, Template, interpolateTemplate } from'./interpolateTemplate.js'

export type InterpolatedContentTemplates = {
  clones: InsertBefore[]
  tagComponents: InterpolateComponentResult[]
}

export function interpolateContentTemplates(
  context: any,
  tagSupport: TagSupport,
  options: InterpolateOptions,
  children: HTMLCollection,
): InterpolatedContentTemplates {
  // counting for animation stagger computing
  const counts = options.counts
  const clones: InsertBefore[] = []
  const tagComponents: InterpolateComponentResult[] = []
  const childLength = children.length
  for (let index=childLength-1; index >= 0; --index) {
    const child = children[index]
    const {clones: nextClones, tagComponent} = interpolateTemplate(
      child as Template,
      context,
      tagSupport,
      counts,
      options,
    )

    clones.push(...nextClones)

    if(tagComponent) {
      tagComponents.push(tagComponent)
      continue
    }
      
    if ( child.children ) {      
      for (let index = child.children.length - 1; index >= 0; --index) {
        const subChild = child.children[index]
        // IF <template end /> its a variable to be processed
        if ( isRenderEndTemplate(subChild) ) {
          const {tagComponent} = interpolateTemplate(
            subChild as Template,
            context,
            tagSupport,
            counts,
            options,
          )

          if(tagComponent) {
            tagComponents.push(tagComponent)
          }
        }

        const {clones:nextClones, tagComponents: nextTagComponent} = interpolateContentTemplates(
          context,
          tagSupport,
          options,
          subChild.children
        )

        clones.push( ...nextClones )
        tagComponents.push( ...nextTagComponent )
      }
    }
  }

  return {clones, tagComponents}
}

function isRenderEndTemplate(child: Element) {
  const isTemplate = child.tagName==='TEMPLATE'
  return isTemplate &&
  child.getAttribute('interpolate') !== undefined && 
  child.getAttribute('end') !== undefined
}
