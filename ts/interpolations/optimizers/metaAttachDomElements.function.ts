// taggedjs-no-compile

import { isSubjectInstance } from "../../isInstance.js"
import { paintAppends } from "../../tag/paint.function.js"
import { BaseSupport, Support } from "../../tag/Support.class.js"
import { Context, ContextItem } from "../../tag/Tag.class.js"
import { InterpolateSubject } from "../../tag/update/processFirstSubject.utils.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js"
import { DomObjectChildren, DomObjectElement, DomObjectText } from "./ObjectNode.types.js"
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { ObjectChildren } from "./exchangeParsedForValues.function.js"

// ??? TODO: This could be done within exchangeParsedForValues to reduce loops
export function attachDomElement(
  nodes: ObjectChildren,
  scope: Context,
  support: BaseSupport | Support,
  counts: Counts, // used for animation stagger computing
  owner?: Element,
  subs: SubToTemplateOptions[] = [],
): {
  subs:SubToTemplateOptions[],
  dom: DomObjectChildren
} {
  const x = document.createElement('div')
  const dom: DomObjectChildren = []

  for (const node of nodes as  DomObjectElement[]) {
    const newNode = {} as DomObjectElement // DomObjectText
    dom.push(newNode)

    const value = node.v as ContextItem
    const isNum = !isNaN(value as unknown as number)

    if(isNum) {
      const marker = newNode.marker = node.marker || document.createTextNode(empty) // textNode.cloneNode(false) as Text
      if(owner) {
        paintAppends.push({
          relative: owner,
          element: marker,
        })
      }
      const subject = scope[ value as unknown as number ]
      subject.global.placeholder = marker
      // delete (node as any).marker // delete so that the marker is not destroyed with tag

      const subVal = subject.value
      if(isSubjectInstance(subVal)) {
        subs.push({
          // fragment: owner,
          insertBefore: marker,
          appendTo: owner,
          
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
        marker,
        owner as Element,
      )
  
      continue
    }

    if (node.nn === 'text') {
      const textNode = (newNode as any as DomObjectText)
      const string = textNode.tc = (node as any as DomObjectText).tc

      // PARSE things like &nbsp; and <!-- -->
      // const newString = string // domParseString(string)
      x.innerHTML = string
      
      const domElement = textNode.domElement = document.createTextNode(x.innerText)
      if(owner) {
        paintAppends.push({
          element: domElement,
          relative: owner,
        })
      }
      continue
    }
  
    const domElement = newNode.domElement = document.createElement(node.nn)

    // attributes that may effect style, come first
    if (node.at) {
      node.at.map(attr =>
        processAttribute(
          {name: attr[0], value: attr[1], isSpecial: attr[2]},
          domElement,
          support,
        )
      )
    }

    if(owner) {
      paintAppends.push({
        element: domElement,
        relative: owner,
      })
    }

    if (node.ch) {
      newNode.ch = attachDomElement(
        node.ch,
        scope,
        support,
        counts,
        domElement,
        subs,
      ).dom
    }
  }

  return {subs, dom}
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
