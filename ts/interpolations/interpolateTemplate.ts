import { Context, ElementBuildOptions, variablePrefix } from '../tag/Tag.class.js'
import { InterpolateOptions } from './interpolateElement.js'
import { elementInitCheck } from './elementInitCheck.js'
import { InsertBefore } from './InsertBefore.type.js'
import { InterpolateSubject, TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js'
import { isTagArray, isTagComponent } from '../isInstance.js'
import { scanTextAreaValue } from './scanTextAreaValue.function.js'
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js'
import { TagSupport } from '../tag/TagSupport.class.js'
import { TemplaterResult } from '../tag/TemplaterResult.class.js'
import { swapInsertBefore } from '../tag/setTagPlaceholder.function.js'

export type Template = Element & {clone?: any}
export type InterpolateComponentResult = {
  subject: InterpolateSubject
  insertBefore: Element | Text | Template
  ownerSupport: TagSupport
  variableName: string
}

export function interpolateTemplate(
  insertBefore: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagvar${index}`:'x'}
  ownerSupport: TagSupport, // Tag class
  counts: Counts, // used for animation stagger computing
): InterpolateComponentResult | undefined {
  if ( !insertBefore.hasAttribute('end') ) {
    return // only care about <template end>
  }

  const variableName = insertBefore.getAttribute('id')
  if(variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
    return // ignore, not a tagVar
  }

  const existingSubject = context[variableName]
  const isDynamic = isTagComponent(existingSubject._value) || isTagArray(existingSubject.value)

  // process dynamics later
  if(isDynamic) {
    return {
      variableName,
      ownerSupport,
      subject: existingSubject,
      insertBefore
    }
  }
  
  subscribeToTemplate(
    insertBefore,
    existingSubject,
    ownerSupport,
    counts,
  )

  return
}

export function subscribeToTemplate(
  insertBefore: InsertBefore,
  subject: InterpolateSubject,
  ownerSupport: TagSupport,
  counts: Counts, // used for animation stagger computing
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
      },
    )

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

/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
  context: Context,
  ownerSupport: TagSupport,
) {
  if(!(elm as Element).getAttribute) {
    return
  }

  // Elements that alter innerHTML
  const tagName = elm.nodeName // elm.tagName
  if(tagName==='TEXTAREA') {
    scanTextAreaValue(elm as HTMLTextAreaElement, context, ownerSupport)
  }

  let diff = options.counts.added
  diff = elementInitCheck(elm, options.counts) - diff

  const hasFocusFun = (elm as any).focus
  if(hasFocusFun) {
    if((elm as any).hasAttribute('autofocus')) {
      (elm as any).focus()
    }

    if((elm as any).hasAttribute('autoselect')) {
      (elm as any).select()
    }
  }

  const children = (elm as Element).children as HTMLCollection
  if(children) {
    for (let index = children.length - 1; index >= 0; --index) {
      const child = children[index]
      const subOptions = {
        ...options,
       counts: options.counts,
      }

      afterElmBuild(child, subOptions, context, ownerSupport)
    }
  }
}
