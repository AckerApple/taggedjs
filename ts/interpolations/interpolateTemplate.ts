import { Context, ElementBuildOptions, variablePrefix } from '../tag/Tag.class.js'
import { elementInitCheck } from './elementInitCheck.js'
import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js'
import { scanTextAreaValue } from './scanTextAreaValue.function.js'
import { Support } from '../tag/Support.class.js'
import { subscribeToTemplate } from './subscribeToTemplate.function.js'

export type Template = Element & {content: any}
export type InterpolateComponentResult = {
  subject: InterpolateSubject
  insertBefore: Element | Text | Template
  ownerSupport: Support
  variableName: string
}

export function interpolateTemplate(
  fragment: DocumentFragment,
  insertBefore: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagvar${index}`:'x'}
  ownerSupport: Support, // Tag class
  counts: Counts, // used for animation stagger computing
): void {
  if ( !insertBefore.hasAttribute('end') ) {
    return // only care about <template end>
  }

  const variableName = insertBefore.getAttribute('id') as string
  const subject = context[variableName]
  subject.global.insertBefore = insertBefore
  
  // process dynamics later
  /* 
  ??? newly removed
  
  const isDynamic = isTagComponent(subject._value) || isTagArray(subject.value)
  if(isDynamic) {
    return {
      variableName,
      ownerSupport,
      subject,
      insertBefore
    }
  }
  */

  subscribeToTemplate(
    fragment,
    insertBefore,
    subject,
    ownerSupport,
    counts,
  )

  return
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
  ownerSupport: Support,
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
