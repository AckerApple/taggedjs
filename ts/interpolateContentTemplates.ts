import { Tag } from "./Tag.class.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { Counts, Template, interpolateTemplate } from "./interpolateTemplate.js"

/** Returns subscriptions[] that will need to be unsubscribed from when element is destroyed */
export function interpolateContentTemplates(
  element: Element,
  variable: any,
  ownerTag: Tag,
  options: InterpolateOptions,
) {
  if ( !element.children || element.tagName === 'TEMPLATE' ) {
    return // done
  }

  const counts: Counts = {
    added: 0,
    removed: 0,
  }

  const children = new Array(...(element.children as any))

  children.forEach((child, index) => {
    interpolateChild(child, index, children, options)
    
    if ( child.children ) {  
      const nextKids = new Array(...child.children)
      nextKids.forEach((subChild, index) => {
        if ( isRenderEndTemplate(subChild) ) {
          interpolateChild(subChild, index, nextKids, options)
        }

        interpolateContentTemplates(subChild, variable, ownerTag, options)
      })
    }
  })

  function interpolateChild(
    child: Element,
    index: number,
    children: Element[],
    options: InterpolateOptions,
  ) {
    children.forEach((child, subIndex) => {
      if ( subIndex < index ) {
        return // too low
      }

      if ( child.tagName!=='TEMPLATE' ) {
        return // not a template
      }
    
      if ( child.getAttribute('interpolate')===undefined || child.getAttribute('end') === undefined ) {
        return // not a rendering template
      }

      return child
    })

    interpolateTemplate(
      child as Template,
      variable,
      ownerTag,
      counts,
      options,
    )
  }

  return
}

function isRenderEndTemplate(child: Element) {
  const isTemplate = child.tagName==='TEMPLATE'
  return isTemplate &&
  child.getAttribute('interpolate') !== undefined && 
  child.getAttribute('end') !== undefined
}
