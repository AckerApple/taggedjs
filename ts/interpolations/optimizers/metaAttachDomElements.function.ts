import { BaseSupport, Support } from "../../tag/Support.class.js"
import { Context } from "../../tag/Tag.class.js"
import { textNode } from "../../tag/textNode.js"
import { TagJsSubject } from "../../tag/update/TagJsSubject.class.js"
import { Counts } from "../interpolateTemplate.js"
import { processAttribute } from "../processAttribute.function.js"
import { subscribeToTemplate } from "../subscribeToTemplate.function.js"
import { DomObjectChildren, DomObjectElement, ObjectChildren, ObjectText } from "./ObjectNode.types.js"

export function attachDomElement(
  nodes: ObjectChildren,
  scope: Context,
  support: BaseSupport | Support,
  fragment: DocumentFragment,
  counts: Counts, // used for animation stagger computing
  owner: Element
): DomObjectChildren {
  nodes.forEach((node, index) => {
    const marker = node.marker = textNode.cloneNode(false) as Text
    // marker.textContent = `_<${index}>_`
    const subject = node.value as TagJsSubject<any>

    if(subject) {
      owner.appendChild( marker )
      subject.global.placeholder = marker
      subscribeToTemplate(
        owner as any,
        marker,
        subject,
        support, // ownerSupport,
        counts,
      )
      return
    }

    if (node.nodeName === 'text') {
      const string = (node as ObjectText).textContent
      // parse things like &nbsp;
      const text = new DOMParser().parseFromString(string, 'text/html')
      const openingSpace = string.replace(/(^\s+)?.+/g,'$1')
      const newString = openingSpace + text.documentElement.textContent as string
      owner.appendChild( marker )
      node.domElement = document.createTextNode(newString)
      owner.appendChild( node.domElement )
      return
    }
  
    node = node as DomObjectElement

    const domElement = node.domElement = document.createElement(node.nodeName)
    
    owner.appendChild(domElement)
    owner.appendChild(marker)

    if (node.attributes) {
      node.attributes.forEach(attr => {
        processAttribute(
          attr,
          domElement,
          scope,
          support,
        )
      })
    }

    if (node.children) {
      attachDomElement(
        node.children, scope, support, fragment, counts, domElement
      )
    }
  })

  return nodes as DomObjectChildren
}
