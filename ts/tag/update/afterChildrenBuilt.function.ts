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
  for (let index=0; index < children.length; ++index) {
    const child = children[index]
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
