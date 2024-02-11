import { Context, ElementBuildOptions, Tag, variablePrefix } from "./Tag.class.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { elementInitCheck } from "./elementInitCheck.js"
import { Clones } from "./Clones.type.js"
import { processSubjectValue } from "./processSubjectValue.function.js"

export type Template = Element & {clone: any}

export function interpolateTemplate(
  template: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagvar${index}`:'x'}
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
    const {clones} = processSubjectValue(
      templateNewValue,
      result,
      template,
      tag,
      {counts, forceElement: isForceElement}
    )

    if(isForceElement) {
      isForceElement = false // only can happen once
    }

    clones.push(...clones)

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
    lastFirstChild.setAttribute('removedAt', Date.now().toString())
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
