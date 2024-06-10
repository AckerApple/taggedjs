import { Support } from '../tag/Support.class.js'
import { Context } from '../tag/Tag.class.js'
import { InterpolateOptions } from'./interpolateElement.js'
import { InterpolateComponentResult, Template, interpolateTemplate } from'./interpolateTemplate.js'

export function interpolateContentTemplates(
  context: Context,
  support: Support,
  options: InterpolateOptions,
  children: HTMLCollection,
  fragment: DocumentFragment,
): InterpolateComponentResult[] {
  // counting for animation stagger computing
  const counts = options.counts
  const tagComponents: InterpolateComponentResult[] = []
  const childLength = children.length
  for (let index=childLength-1; index >= 0; --index) {
    const child = children[index]  
    // const tagComponent =
    interpolateTemplate(
      fragment,
      child as Template,
      context,
      support,
      counts,
    )

    // clones.push(...nextClones)
    /*
    if(tagComponent) {
      tagComponents.push(tagComponent)
      continue
    }
    */
      
    if ( child.children ) {      
      for (let index = child.children.length - 1; index >= 0; --index) {
        const subChild = child.children[index]
        // IF <template end /> its a variable to be processed
        if ( isRenderEndTemplate(subChild) ) {
          // const tagComponent =
          interpolateTemplate(
            fragment,
            subChild as Template,
            context,
            support,
            counts,
          )

          /*
          if(tagComponent) {
            tagComponents.push(tagComponent)
          }
          */
        }

        const nextTagComponent = interpolateContentTemplates(
          context,
          support,
          options,
          subChild.children,
          fragment,
        )

        tagComponents.push(...nextTagComponent)
      }
    }
  }

  return tagComponents
}

function isRenderEndTemplate(child: Element) {
  const isTemplate = child.tagName==='TEMPLATE'
  return isTemplate &&
  child.getAttribute('interpolate') !== undefined && 
  child.getAttribute('end') !== undefined
}
