import { Context, ElementBuildOptions, Tag, variablePrefix } from "./Tag.class.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { elementInitCheck } from "./elementInitCheck.js"
import { Clones } from "./Clones.type.js"
import { InterpolateSubject, processSubjectValue } from "./processSubjectValue.function.js"
import { isTagComponent } from "./isInstance.js"
import { DisplaySubject } from "./Tag.utils.js"
import { scanTextAreaValue } from "./scanTextAreaValue.function.js"

export type Template = Element & {clone?: any}
export type InterpolateComponentResult = {
  subject: InterpolateSubject
  insertBefore: Element | Text | Template
  ownerTag: Tag
}
export type InterpolateTemplateResult = {
  clones: Clones
  tagComponent?: InterpolateComponentResult
}

export function interpolateTemplate(
  insertBefore: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagvar${index}`:'x'}
  ownerTag: Tag, // Tag class
  counts: Counts, // used for animation stagger computing
  options: InterpolateOptions,
): InterpolateTemplateResult {
  const clones: Clones = []

  if ( !insertBefore.hasAttribute('end') ) {
    return {clones} // only care about <template end>
  }

  const variableName = insertBefore.getAttribute('id')
  if(variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
    return {clones} // ignore, not a tagVar
  }

  const existingSubject = context[variableName]
  
  if(isTagComponent(existingSubject.value)) {
    return {clones, tagComponent: {ownerTag, subject: existingSubject, insertBefore}}
  }
  
  let isForceElement = options.forceElement
  subscribeToTemplate(
    insertBefore,
    existingSubject,
    ownerTag,
    clones,
    counts,
    {isForceElement}
  )

  return {clones}
}

export function subscribeToTemplate(
  insertBefore: Element | Text | Template,
  subject: InterpolateSubject,
  ownerTag: Tag,
  clones: Clones,
  counts: Counts, // used for animation stagger computing
  {isForceElement}: {isForceElement?:boolean}
): Clones {
  const callback = (value: unknown) => {
    const clone = (subject as DisplaySubject).clone
    if(clone) {
      insertBefore = clone
    }

    const nextClones = processSubjectValue(
      value,
      subject,
      insertBefore,
      ownerTag,
      {
        counts: {...counts},
        forceElement: isForceElement,
      }
    )

    if(isForceElement) {
      isForceElement = false // only can happen once
    }

    clones.push(...nextClones)
  }

  const sub = subject.subscribe(callback as any)
  ownerTag.cloneSubs.push(sub)
  return clones
}

// Function to update the value of x
export function updateBetweenTemplates(
  value: string | undefined | boolean | number,
  lastFirstChild: Element | Text,
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
  
  return textNode
}

export type Counts = {
  added: number
  removed: number // increased when item removed from array
}

export function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
  context: Context,
  ownerTag: Tag,
) {
  if(!(elm as Element).getAttribute) {
    return
  }

  const tagName = elm.nodeName // elm.tagName
  if(tagName==='TEXTAREA') {
    scanTextAreaValue(elm as HTMLTextAreaElement, context, ownerTag)
  }

  let diff = options.counts.added
  if(!options.forceElement) {
    diff = elementInitCheck(elm, options.counts) - diff
  }

  if((elm as Element).children) {
    const subCounts = {
      added: options.counts.added, // - diff,
      removed: options.counts.removed,
    }

    new Array(...(elm as Element).children as any).forEach((child, index) => {
      const subOptions = {
        ...options,
       counts: options.counts,
      }

      return afterElmBuild(child, subOptions, context, ownerTag)
    })
  }
}
