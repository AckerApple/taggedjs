import { Context, ElementBuildOptions, Tag, variablePrefix } from "./Tag.class.js"
import { isSubjectInstance, isTagComponent, isTagInstance } from "./isInstance.js"
import { getTagSupport } from "./getTagSupport.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { elementInitCheck } from "./elementInitCheck.js"
import { processTagArray } from "./processTagArray.js"
import { Clones } from "./Clones.type.js"
import { processSubjectComponent } from "./processSubjectComponent.function.js"
import { processTagResult } from "./processTagResult.function.js"

export function interpolateTemplate(
  template: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagVar${index}`:'x'}
  tag: Tag, // Tag class
  counts: Counts, // {added:0, removed:0}
  options: InterpolateOptions,
): Clones {
  const clones: Clones = []

  if ( !template.hasAttribute('end') ) {
    return clones // only care about starts
  }

  const variableName = template.getAttribute('id')
  if(variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
    return clones // ignore, not a tagVar
  }

  const result = context[variableName]
  // const isSubject = isSubjectInstance(result)
  let isForceElement = options.forceElement
  
  const callback = (templateNewValue: any) => {
    const subjectClones = processSubjectValue(
      templateNewValue,
      result,
      template,
      tag,
      {counts, forceElement: isForceElement}
    )

    if(isForceElement) {
      isForceElement = false // only can happen once
    }

    clones.push(...subjectClones)

    // TODO: See if we can remove
    setTimeout(() => {
      counts.added = 0 // reset
      counts.removed = 0 // reset
    }, 0)
  }

  const sub = result.subscribe(callback as any)
  tag.cloneSubs.push(sub)

  return clones
}

export type Template = Element & {clone: any}

function processSubjectValue(
  value: any,
  result: any, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  tag: Tag,
  options: {forceElement?: boolean, counts: Counts}, // {added:0, removed:0}
): Clones {
  if (isTagInstance(value)) {
    // first time seeing this tag?
    if(!value.tagSupport) {
      value.tagSupport = getTagSupport( tag.tagSupport.depth + 1 )
      value.tagSupport.mutatingRender = tag.tagSupport.mutatingRender
      value.tagSupport.oldest = value.tagSupport.oldest || value
      
      tag.children.push(value as Tag)
      value.ownerTag = tag
    }

    const clones = processTagResult(
      value,
      result, // Function will attach result.tag
      template,
      options,
    )

    return clones
  }

  // *for map
  const isArray = value instanceof Array && value.every(x => isTagInstance(x))
  if(isArray) {
    return processTagArray(result, value, template, tag, options)
  }

  if(isTagComponent(value)) {
    return processSubjectComponent(value, result, template, tag, options)
  }

  // *if processing WAS a tag BUT NOW its some other non-tag value
  if (result.tag) {
    // put the template back
    const lastFirstChild = template.clone || template// result.tag.clones[0] // template.lastFirstChild
    const parentNode = lastFirstChild.parentNode || template.parentNode
    lastFirstChild.parentNode.insertBefore(template, lastFirstChild)

    const stagger = options.counts.removed
    const tag: Tag = result.tag
    tag.destroy({stagger}).then(animated => {      
      options.counts.removed = stagger + animated
      delete result.tag
    })

    const clone = updateBetweenTemplates(
      value,
      template, // ✅ this will be removed
    ) // the template will be remove in here

    template.clone = clone

    return []
  }

  const before = template.clone || template // Either the template is on the doc OR its the first element we last put on doc

  // Processing of regular values
  const clone = updateBetweenTemplates(
    value,
    before, // this will be removed
  )

  template.clone = clone
  const clones: Clones = []

  const oldPos = tag.clones.indexOf(before)
  if(oldPos>=0 && !tag.clones.includes(clone) && !before.parentNode) {
    tag.clones.splice(oldPos, 1)
    tag.clones.push(clone)
    clones.push(clone)
  }

  return clones
}

// Function to update the value of x
export function updateBetweenTemplates(
  value: string | undefined | boolean | number,
  lastFirstChild: Element,
) {
  const parent = lastFirstChild.parentNode as ParentNode
  
  // mimic React skipping to display EXCEPT for true does display on page
  if(value === undefined || value === false || value === null) { // || value === true
    value = ''
  }

  // Insert the new value (never use innerHTML here)
  const textNode = document.createTextNode(value as string) // never innerHTML
  parent.insertBefore(textNode, lastFirstChild)

  /* remove existing nodes */
  parent.removeChild(lastFirstChild)
  if(lastFirstChild.nodeName === 'TEMPLATE') {
    lastFirstChild.setAttribute('removeAt', Date.now().toString())
  }
  
  return textNode
}

export type Counts = {
  added: number
  removed: number
}

export function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
) {
  if(!(elm as Element).getAttribute) {
    return
  }

  if(!options.forceElement) {
    elementInitCheck(elm, options.counts)
  }

  if((elm as Element).children) {
    new Array(...(elm as Element).children as any).forEach(child => afterElmBuild(child, options))
  }
}
