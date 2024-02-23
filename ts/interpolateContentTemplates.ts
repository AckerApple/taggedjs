import { Clones } from "./Clones.type.js"
import { Tag } from "./Tag.class.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { Counts, Template, interpolateTemplate } from "./interpolateTemplate.js"

const templateSearch = new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)')

/** Returns subscriptions[] that will need to be unsubscribed from when element is destroyed */
export function interpolateContentTemplates(
  element: Element, // <div><div></div><template tag-wrap="22">...</template></div>
  context: any,
  tag: Tag,
  options: InterpolateOptions,
  children: HTMLCollection,
): Clones {

  if ( !children || element.tagName === 'TEMPLATE' ) {
    return [] // done
  }

  // counting for animation stagger computing
  const counts = options.counts
  const clones: Clones = []
  const childArray = new Array(...children)

  if(element.tagName==='TEXTAREA') {
    scanTextAreaValue(element as HTMLTextAreaElement)
  }

  childArray.forEach((child, childIndex) => {
    const nextClones = interpolateTemplate(
      child as Template,
      context,
      tag,
      counts,
      options,
    )

    if(child.tagName==='TEXTAREA') {
      scanTextAreaValue(child as HTMLTextAreaElement)
    }
  
    clones.push(...nextClones)
    
    if ( child.children ) {      
      const nextKids = new Array(...child.children)
      nextKids.forEach((subChild, index) => {

        if ( isRenderEndTemplate(subChild) ) {
          interpolateTemplate(
            subChild as Template,
            context,
            tag,
            counts,
            options,
          )
        }

        const nextClones = interpolateContentTemplates(
          subChild,
          context,
          tag,
          options,
          subChild.children
        )
        clones.push( ...nextClones )
      })
    }
  })

  return clones
}

function isRenderEndTemplate(child: Element) {
  const isTemplate = child.tagName==='TEMPLATE'
  return isTemplate &&
  child.getAttribute('interpolate') !== undefined && 
  child.getAttribute('end') !== undefined
}

function scanTextAreaValue(textarea: HTMLTextAreaElement) {
  const value = textarea.value
  if( value.search(templateSearch) >=0 ) {
    const match = value.match(/__tagvar(\d{1,4})/);
    const result = match ? match[0] : ''
    const token = '{' + result + '}'
    // textarea.value = token
    textarea.value = ''
    textarea.setAttribute('textVarValue', token)
  }
}
