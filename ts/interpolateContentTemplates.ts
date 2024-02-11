import { Clones } from "./Clones.type.js"
import { Tag } from "./Tag.class.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { Counts, Template, interpolateTemplate } from "./interpolateTemplate.js"

const templateSearch = new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)')

/** Returns subscriptions[] that will need to be unsubscribed from when element is destroyed */
export function interpolateContentTemplates(
  element: Element,
  variable: any,
  tag: Tag,
  options: InterpolateOptions,
): Clones {
  if ( !element.children || element.tagName === 'TEMPLATE' ) {
    return [] // done
  }

  const counts: Counts = {
    added: 0,
    removed: 0,
  }
  const clones: Clones = []

  const children = new Array(...(element.children as any))

  if(element.tagName==='TEXTAREA') {
    scanTextAreaValue(element as HTMLTextAreaElement)
  }

  children.forEach((child, index) => {
    const nextClones = interpolateChild(
      child,
      index, // seems no longer used
      children, // seems no longer used
      options,
      variable,
      tag,
      counts,
    )

    if(child.tagName==='TEXTAREA') {
      scanTextAreaValue(child as HTMLTextAreaElement)
    }
  
    clones.push(...nextClones)
    
    if ( child.children ) {  
      const nextKids = new Array(...child.children)
      nextKids.forEach((subChild, index) => {
        if ( isRenderEndTemplate(subChild) ) {
          interpolateChild(subChild, index, nextKids, options, variable, tag, counts)
        }

        const nextClones = interpolateContentTemplates(subChild, variable, tag, options)
        clones.push( ...nextClones )
      })
    }
  })

  return clones
}

function interpolateChild(
  child: Element,
  index: number,
  children: Element[],
  options: InterpolateOptions,
  variable: any,
  tag: Tag,
  counts: Counts,
): Clones {
  /*
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
  */

  const clones = interpolateTemplate(
    child as Template,
    variable,
    tag,
    counts,
    options,
  )

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