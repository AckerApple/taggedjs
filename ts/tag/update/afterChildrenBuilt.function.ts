import { Context } from '../Tag.class.js'
import { elementInitCheck } from '../../interpolations/elementInitCheck.js'
import { ElementBuildOptions } from '../../interpolations/interpolateTemplate.js'
import { AnySupport } from '../Support.class.js'
import { TagJsSubject } from './TagJsSubject.class.js'

export function afterChildrenBuilt(
  children: HTMLCollection, // Element[],
  subject: TagJsSubject<any>,
  ownerSupport: AnySupport,
) {
  for (const child of children) {
    afterElmBuild(
      child,
      {counts: {added:0, removed:0}},
      subject.global.context,
      ownerSupport,
    )
  }
}

/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
  context: Context,
  ownerSupport: AnySupport,
) {
  if (!(elm as Element).getAttribute) {
    return
  }

  elementInitCheck(elm, options.counts)

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
    for (const child of children) {
      const subOptions = {
        ...options,
        counts: options.counts,
      }

      afterElmBuild(child, subOptions, context, ownerSupport)
    }
  }
}
