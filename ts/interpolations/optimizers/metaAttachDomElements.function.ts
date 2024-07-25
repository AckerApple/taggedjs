// taggedjs-no-compile

import { isSubjectInstance } from "../../isInstance.js"
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js"
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
import { howToSetInputValue } from "../attributes/howToSetInputValue.function.js"

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
      const marker = document.createTextNode(empty)
      const subject = scope[ value as unknown as number ]
      subject.global.placeholder = marker

      if(owner) {
        paintAppends.push({
          relative: owner,
          element: marker,
        })
      } else {
        paintInsertBefores.push({
          element: marker,
          relative: support.subject.global.placeholder as Text,
        })
      }
      // newNode.marker = marker
      // delete newNode.marker // delete so that the marker is not destroyed with tag

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
        counts,
        owner,
      )
  
      continue
    }

    if (node.nn === 'text') {
      const textNode = (newNode as any as DomObjectText)
      const string = textNode.tc = (node as any as DomObjectText).tc
      
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
          attr[0], // name
          domElement,
          support,
          howToSetInputValue,
          attr[1], // value
          attr[2] as boolean | undefined, // isSpecial
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
