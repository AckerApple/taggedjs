import { Clones } from "./Clones.type"
import { TagSupport } from "../tag/TagSupport.class"
import { InterpolateOptions } from "./interpolateElement"
import { InterpolateComponentResult, Template, interpolateTemplate } from "./interpolateTemplate"

export type InterpolatedContentTemplates = {
  clones: Clones
  tagComponents: InterpolateComponentResult[]
}

export function interpolateContentTemplates(
  element: Element,
  context: any,
  tagSupport: TagSupport,
  options: InterpolateOptions,
  children: HTMLCollection,
): InterpolatedContentTemplates {
  if ( !children || element.tagName === 'TEMPLATE' ) {
    return {clones:[], tagComponents: []} // done
  }

  // counting for animation stagger computing
  const counts = options.counts
  const clones: Clones = []
  const tagComponents: InterpolateComponentResult[] = []
  const childArray = new Array(...children)

  childArray.forEach(child => {
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
      return
    }
      
    if ( child.children ) {      
      const nextKids = new Array(...child.children)
      nextKids.forEach((subChild, index) => {

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
          subChild,
          context,
          tagSupport,
          options,
          subChild.children
        )

        clones.push( ...nextClones )
        tagComponents.push( ...nextTagComponent )
      })
    }
  })

  return {clones, tagComponents}
}

function isRenderEndTemplate(child: Element) {
  const isTemplate = child.tagName==='TEMPLATE'
  return isTemplate &&
  child.getAttribute('interpolate') !== undefined && 
  child.getAttribute('end') !== undefined
}
