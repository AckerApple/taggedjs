import { isSubjectInstance } from "../../isInstance.js"
import { paintAppends } from "../../tag/paint.function.js"
import { BaseSupport, Support } from "../../tag/Support.class.js"
import { Context, ContextItem } from "../../tag/Tag.class.js"
import { InterpolateSubject } from "../../tag/update/processFirstSubject.utils.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js"
import { DomObjectElement, ObjectText } from "./ObjectNode.types.js"
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { ObjectChildren } from "./exchangeParsedForValues.function.js"

// ??? TODO: This could be done within exchangeParsedForValues to reduce loops
export function attachDomElement(
  nodes: ObjectChildren,
  scope: Context,
  support: BaseSupport | Support,
  counts: Counts, // used for animation stagger computing
  owner: Element,
  subs: SubToTemplateOptions[] = [],
) {
  const x = document.createElement('div')

  for (const node of nodes as  DomObjectElement[]) {
    const value = node.value as ContextItem
    const isNum = !isNaN(value as unknown as number)

    if(isNum) {
      const marker = node.marker = node.marker || document.createTextNode(empty) // textNode.cloneNode(false) as Text
      paintAppends.push(() => owner.appendChild(marker))
      const subject = scope[ value as unknown as number ]
      subject.global.placeholder = marker
      // delete (node as any).marker // delete so that the marker is not destroyed with tag

      const subVal = subject.value
      if(isSubjectInstance(subVal)) {
        subs.push({
          fragment: owner,
          insertBefore: marker,
          subject: subVal as InterpolateSubject,
          support, // ownerSupport,
          counts,
          contextItem: subject,
        })
        continue
      }

      processFirstSubjectValue(
        subject.value,
        subject,
        support,
        {
          counts: {...counts},
        },
        owner,
      )
  
      continue
    }

    if (node.nodeName === 'text') {
      const textNode = (node as any as ObjectText)
      const string = textNode.textContent
      // PARSE things like &nbsp; and <!-- -->
      // const newString = string // domParseString(string)
      x.innerHTML = string
      const domElement = textNode.domElement = document.createTextNode(x.innerText)
      paintAppends.push(() => {
        // owner.appendChild(marker)
        owner.appendChild(domElement)
      })
      continue
    }
  
    const domElement = node.domElement = document.createElement(node.nodeName)

    // attributes that may effect style, come first
    if (node.attributes) {
      node.attributes.forEach(attr => {
        processAttribute(
          attr,
          domElement,
          support,
        )
      })
    }

    paintAppends.push(() => {
      owner.appendChild(domElement)
      // owner.appendChild(marker)
    })

    if (node.children) {
      attachDomElement(
        node.children,
        scope,
        support,
        counts,
        domElement,
        subs,
      )
    }
  }

  return {subs}
}

// parse things like &nbsp; and <!-- -->
function domParseString(string: string) {
  const text = new DOMParser().parseFromString(string, 'text/html')
  return getLeadingSpaces(string) + text.documentElement.textContent as string
}

function getLeadingSpaces(str: string) {
  const match = str.match(/^\s+/);
  return match ? match[0] : '';
}
