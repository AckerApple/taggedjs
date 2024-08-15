// taggedjs-no-compile

import { isSubjectInstance } from "../../isInstance.js"
import { paint, paintAppends, paintInsertBefores } from "../../tag/paint.function.js"
import { AnySupport, BaseSupport, Support } from "../../tag/Support.class.js"
import { Context, ContextItem } from "../../tag/Context.types.js"
import { InterpolateSubject } from "../../tag/update/processFirstSubject.utils.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js"
import { DomObjectChildren, DomObjectElement, DomObjectText } from "./ObjectNode.types.js"
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { ObjectChildren } from "./LikeObjectElement.type.js"
import { howToSetInputValue } from "../attributes/howToSetInputValue.function.js"
import { runOneContext, TagGlobal } from "../../tag/index.js"

// ??? TODO: This could be done within exchangeParsedForValues to reduce loops
export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: BaseSupport | Support,
  counts: Counts, // used for animation stagger computing
  context: Context,
  owner?: Element,
  insertBefore?: Text,
  subs: SubToTemplateOptions[] = [],
): {
  context: Context
  subs:SubToTemplateOptions[]
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
      attachDynamicDom(
        values,
        context,
        owner,
        support,
        subs,
        counts,
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
      } else {
        paintInsertBefores.push({
          element: domElement,
          relative: insertBefore as Text,
        })
      }
      continue
    }
  
    const domElement = newNode.domElement = document.createElement(node.nn)

    // attributes that may effect style, come first
    if (node.at) {
      node.at.map(attr =>
        processAttribute(
          values,
          attr[0], // name
          domElement,
          support,
          howToSetInputValue,
          context,
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
    } else {
      paintInsertBefores.push({
        element: domElement,
        relative: insertBefore as Text,
      })
    }

    if (node.ch) {
      newNode.ch = attachDomElements(
        node.ch,
        values,
        support,
        counts,
        context,
        domElement,
        insertBefore,
        subs,
      ).dom
    }
  }

  return {subs, dom, context}
}

function attachDynamicDom(
  values: any[],
  context: Context,
  owner: Element | undefined,
  support: AnySupport,
  subs:SubToTemplateOptions[],
  counts: Counts, // used for animation stagger computing
) {
  const subVal = values[ context.length ]
  const marker = document.createTextNode(empty)
  const contextItem = runOneContext(
    subVal,
    context,
  )
  contextItem.placeholder = marker

  if(owner) {
    paintAppends.push({
      relative: owner,
      element: marker,
    })
  } else {
    paintInsertBefores.push({
      element: marker,
      relative: support.subject.placeholder as Text,
    })
  }

  if(isSubjectInstance(subVal)) {
    subs.push({
      insertBefore: marker,
      appendTo: owner,
      
      subject: subVal as InterpolateSubject,
      support, // ownerSupport,
      counts,
      contextItem,
    })
    return
  }

  const global = support.subject.global as TagGlobal
  global.locked = true
  
  processFirstSubjectValue(
    subVal,
    contextItem,
    support,
    counts,
    owner,
  )

  const global2 = support.subject.global as TagGlobal
  delete global2.locked
  contextItem.value = subVal

  return
}