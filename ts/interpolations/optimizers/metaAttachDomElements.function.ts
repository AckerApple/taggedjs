import { BaseSupport, Support } from "../../tag/Support.class.js"
import { Context } from "../../tag/Tag.class.js"
import { textNode } from "../../tag/textNode.js"
import { TagJsSubject } from "../../tag/update/TagJsSubject.class.js"
import { Counts } from "../interpolateTemplate.js"
import { processAttribute } from "../processAttribute.function.js"
import { subscribeToTemplate } from "../subscribeToTemplate.function.js"
import { DomObjectChildren, DomObjectElement, ObjectChildren, ObjectText } from "./ObjectNode.types.js"

// TODO: This could be done within exchangeParsedForValues to reduce loops
export function attachDomElement(
  nodes: ObjectChildren,
  scope: Context,
  support: BaseSupport | Support,
  fragment: DocumentFragment,
  counts: Counts, // used for animation stagger computing
  owner: Element
): DomObjectChildren {
  for (let index = 0; index < nodes.length; ++index) {
    const node = nodes[index] as DomObjectElement
    const marker = node.marker = textNode.cloneNode(false) as Text
    const subject = node.value as TagJsSubject<any>

    if(subject) {
      // nodes.splice(index, 1) // placeholder will continue its life separated from domMeta
      owner.appendChild( marker )
      subject.global.placeholder = marker
      delete (node as any).marker
      subscribeToTemplate(
        owner as any,
        marker,
        subject,
        support, // ownerSupport,
        counts,
      )
      continue
    }

    if (node.nodeName === 'text') {
      const textNode = (node as any as ObjectText)
      const string = textNode.textContent
      // parse things like &nbsp;
      const newString = domParseString(string)
      owner.appendChild( marker )
      textNode.domElement = document.createTextNode(newString)
      owner.appendChild( node.domElement )
      continue
    }
  
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
  }

  return nodes as DomObjectChildren
}

export function domParseString(string: string) {
  const text = new DOMParser().parseFromString(string, 'text/html')
  return getLeadingSpaces(string) + text.documentElement.textContent as string
}

function getLeadingSpaces(str: string) {
  const match = str.match(/^\s+/);
  return match ? match[0] : '';
}
