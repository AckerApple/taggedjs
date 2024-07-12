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
    const elmMeta = kids[index] as DomObjectElement
    const attributes = elmMeta.attributes

    if(!attributes) {
      ++index
      continue
    }

    const domElm = elmMeta.domElement    
    elmMeta.attributes.forEach(attribute => {      
      const name = attribute[0]
      
      switch (name) {
        case 'oninit':
          elementInitCheck(domElm, {added:0, removed:0})
          break;

        case 'autofocus':
          (domElm as any).focus()
          break;

        case 'autoselect':
          (domElm as any).select()
          break;
      }
    })
  
    const children = elmMeta.children
    if(children) {
      afterChildrenBuilt(children, subject, ownerSupport)
    }

    ++index
  }
}
