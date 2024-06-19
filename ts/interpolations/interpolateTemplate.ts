import { Context } from '../tag/Tag.class.js'
import { elementInitCheck } from './elementInitCheck.js'
import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js'
// import { scanTextAreaValue } from './scanTextAreaValue.function.js'
import { AnySupport, Support } from '../tag/Support.class.js'
import { subscribeToTemplate } from './subscribeToTemplate.function.js'

export type Template = Element & { content: any }
export type InterpolateComponentResult = {
  subject: InterpolateSubject
  insertBefore: Element | Text | Template
  ownerSupport: Support
  variableName: string
}

export type Counts = {
  added: number
  removed: number // increased when item removed from array
}

export type ElementBuildOptions = {
  counts: Counts
}

/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
  context: Context,
  ownerSupport: AnySupport,
) {
  if (!(elm as Element).getAttribute) {
    return
  }

  let diff = options.counts.added
  diff = elementInitCheck(elm, options.counts) - diff

  const hasFocusFun = (elm as any).focus
  if (hasFocusFun) {
    if ((elm as any).hasAttribute('autofocus')) {
      (elm as any).focus()
    }

    if ((elm as any).hasAttribute('autoselect')) {
      (elm as any).select()
    }
  }

  const children = (elm as Element).children as HTMLCollection
  if (children) {
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
