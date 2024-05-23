import { Context, ElementBuildOptions, variablePrefix } from "../tag/Tag.class"
import { InterpolateOptions } from "./interpolateElement"
import { elementInitCheck } from "./elementInitCheck"
import { Clones, InsertBefore } from "./Clones.type"
import { InterpolateSubject, TemplateValue } from "../tag/update/processFirstSubject.utils"
import { processFirstSubjectValue } from "../tag/update/processFirstSubjectValue.function"
import { isTagArray, isTagComponent } from "../isInstance"
import { scanTextAreaValue } from "./scanTextAreaValue.function"
import { updateExistingValue } from "../tag/update/updateExistingValue.function"
import { TagSupport } from "../tag/TagSupport.class"
import { TemplaterResult } from "../TemplaterResult.class"
import { swapInsertBefore } from "../tag/setTagPlaceholder.function"

export type Template = Element & {clone?: any}
export type InterpolateComponentResult = {
  subject: InterpolateSubject
  insertBefore: Element | Text | Template
  ownerSupport: TagSupport
  variableName: string
}
export type InterpolateTemplateResult = {
  clones: Clones
  tagComponent?: InterpolateComponentResult
}

export function interpolateTemplate(
  insertBefore: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagvar${index}`:'x'}
  ownerSupport: TagSupport, // Tag class
  counts: Counts, // used for animation stagger computing
  options: InterpolateOptions,
): InterpolateTemplateResult {
  // TODO: THe clones array is useless here
  const clones: Clones = []

  if ( !insertBefore.hasAttribute('end') ) {
    return {clones} // only care about <template end>
  }

  const variableName = insertBefore.getAttribute('id')
  if(variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
    return {clones} // ignore, not a tagVar
  }

  const existingSubject = context[variableName]
  const isDynamic = isTagComponent(existingSubject.value) || isTagArray(existingSubject.value)

  // process dynamics later
  if(isDynamic) {
    return {
      clones,
      tagComponent: {
        variableName,
        ownerSupport,
        subject: existingSubject,
        insertBefore
      }}
  }
  
  let isForceElement = options.forceElement
  subscribeToTemplate(
    insertBefore,
    existingSubject,
    ownerSupport,
    counts,
    {isForceElement},
  )

  return {clones}
}

export function subscribeToTemplate(
  insertBefore: InsertBefore,
  subject: InterpolateSubject,
  ownerSupport: TagSupport,
  counts: Counts, // used for animation stagger computing
  {isForceElement}: {isForceElement?:boolean},
) {
  let called = false
  const onValue = (value: TemplateValue) => {
    if(called) {
      updateExistingValue(
        subject,
        value,
        ownerSupport,
        insertBefore, // needed incase type of value changed and a redraw required
      )
      return
    }

    const templater = value as TemplaterResult

    processFirstSubjectValue(
      templater,
      subject,
      insertBefore,
      ownerSupport,
      {
        counts: {...counts},
        forceElement: isForceElement,
      },
    )

    if(isForceElement) {
      isForceElement = false // only can happen once
    }

    called = true
  }

  let mutatingCallback = onValue

  const callback = (value: TemplateValue) => mutatingCallback(value)
  const sub = subject.subscribe(callback as any)
  
  // on subscribe, the Subject did NOT emit immediately. Lets pull the template off the document
  if(insertBefore.parentNode) {
    const clone = subject.clone = swapInsertBefore(insertBefore)
    mutatingCallback = v => {
      const parentNode = clone.parentNode as ParentNode
      parentNode.insertBefore(insertBefore, clone)
      parentNode.removeChild(clone)
      delete subject.clone
      mutatingCallback = onValue // all future calls will just produce value
      onValue(v) // calls for rending
    }
  }
  
  ownerSupport.global.subscriptions.push(sub)
}

export type Counts = {
  added: number
  removed: number // increased when item removed from array
}

export function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
  context: Context,
  ownerSupport: TagSupport,
) {
  if(!(elm as Element).getAttribute) {
    return
  }

  const tagName = elm.nodeName // elm.tagName
  if(tagName==='TEXTAREA') {
    scanTextAreaValue(elm as HTMLTextAreaElement, context, ownerSupport)
  }

  let diff = options.counts.added
  diff = elementInitCheck(elm, options.counts) - diff

  if((elm as Element).children) {
    new Array(...(elm as Element).children as any).forEach((child, index) => {
      const subOptions = {
        ...options,
       counts: options.counts,
      }

      return afterElmBuild(child, subOptions, context, ownerSupport)
    })
  }
}
