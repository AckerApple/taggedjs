import { elementInitCheck } from '../../interpolations/attributes/elementInitCheck.js'
import { DomObjectChildren, DomObjectElement } from '../../interpolations/optimizers/ObjectNode.types.js'
import { AnySupport } from '../Support.class.js'
import { ContextItem } from '../Tag.class.js'

/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export function afterChildrenBuilt(
  children: DomObjectChildren, // HTMLCollection // Element[],
  subject: ContextItem,
  ownerSupport: AnySupport,
) {
  const kids = children
  const len = kids.length
  let index = 0
  while (index < len) {
    const elm = kids[index] as DomObjectElement

    const isElm = elm.nodeName !== 'text' // (elm as Element).getAttribute
    if (!isElm) {
      return
    }

    const domElm = elm.domElement
  
    // ??? todo this might be way animations out of sync
    elementInitCheck(domElm, {added:0, removed:0})
  
    const hasFocusAbility = (domElm as any).focus
    if (hasFocusAbility) {
      if ((domElm as any).hasAttribute('autofocus')) {
        (domElm as any).focus()
      }
  
      if ((domElm as any).hasAttribute('autoselect')) {
        (domElm as any).select()
      }
    }
  
    const children = elm.children
    if(children) {
      afterChildrenBuilt(children, subject, ownerSupport)
    }

    ++index
  }
}
