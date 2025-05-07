// taggedjs-no-compile

import { DomObjectChildren, DomObjectElement, DomObjectText } from "./ObjectNode.types.js"
import { howToSetFirstInputValue } from "../attributes/howToSetInputValue.function.js"
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/Context.types.js"
import { ObjectChildren } from "./LikeObjectElement.type.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"
import { attachDynamicDom } from "./attachDynamicDom.function.js"

export const blankHandler = () => undefined
const someDiv = (typeof document === 'object' && document.createElement('div')) as HTMLDivElement // used for content cleaning

export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: AnySupport,
  counts: Counts, // used for animation stagger computing
  context: ContextItem[],
  depth: number, // used to know if dynamic variables live within parent owner tag/support
  appendTo?: Element,
  insertBefore?: Text,
): {
  context: ContextItem[]
  dom: DomObjectChildren // return of children created. Used to attach `ch` for children to a node
} {
  const dom: DomObjectChildren = []

  if(appendTo && insertBefore === undefined) {
    insertBefore = document.createTextNode(empty)

    paintAppends.push({
      element: insertBefore,
      relative: appendTo,
    })

    appendTo = undefined
  }

  for (let index=0; index < nodes.length; ++index) {
    const node = (nodes as DomObjectElement[])[index]
    
    const value = node.v as ContextItem
    const isNum = !isNaN(value as unknown as number)
    
    if(isNum) {
      const index = context.length
      const value = values[ index ]

      attachDynamicDom(
        value,
        context,
        support,
        counts,
        depth,
        appendTo,
        insertBefore,
      )
      continue
    }

    const newNode = {} as DomObjectElement // DomObjectText
    dom.push(newNode)

    if (node.nn === 'text') {
      attachDomText(newNode, node, appendTo, insertBefore)
      continue
    }

    // one single html element
    const domElement = attachDomElement(
      newNode,
      node,
      values,
      support,
      context,
      counts,
      appendTo,
      insertBefore,
    )

    if (node.ch) {
      newNode.ch = attachDomElements(
        node.ch,
        values,
        support,
        counts,
        context,
        depth + 1,
        domElement,
        insertBefore,
      ).dom
    }
  }

  return {dom, context}
}

function attachDomElement(
  newNode: DomObjectElement,
  node: DomObjectElement,
  values: any[],
  support: AnySupport,
  context: ContextItem[],
  counts: Counts,
  appendTo: Element | undefined,
  insertBefore: Text | undefined,
) {
  const domElement = newNode.domElement = document.createElement(node.nn)
  
  // attributes that may effect style, come first for performance
  if (node.at) {
    node.at.forEach(attr => {
      const name = attr[0]
      const value = attr[1]
      const isSpecial = attr[2] || false

      processAttribute(
        values,
        name,
        domElement,
        support,
        // howToSetInputValue, // maybe more performant for updates but not first renders
        howToSetFirstInputValue,
        context,
        isSpecial,
        counts,
        value
      )
    })
  }

  if (appendTo) {
    paintAppends.push({
      element: domElement,
      relative: appendTo,
    })
  } else {
    paintInsertBefores.push({
      element: domElement,
      relative: insertBefore as Text,
    })
  }
  return domElement
}

function attachDomText(
  newNode: DomObjectElement,
  node: DomObjectElement,
  owner: Element | undefined,
  insertBefore: Text | undefined
) {
  const textNode = (newNode as any as DomObjectText)
  const string = textNode.tc = (node as any as DomObjectText).tc

  someDiv.innerHTML = string
  const domElement = textNode.domElement = document.createTextNode(someDiv.innerText);

  if (owner) {
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
}
