// taggedjs-no-compile

import { DomObjectChildren, DomObjectElement, DomObjectText } from "../../interpolations/optimizers/ObjectNode.types.js"
import { howToSetFirstInputValue } from "../../interpolations/attributes/howToSetInputValue.function.js"
import { paintAppend, paintAppends, paintAppendText, paintBefore, paintBeforeText, paintCommands } from "../paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/Context.types.js"
import { ObjectChildren } from "../../interpolations/optimizers/LikeObjectElement.type.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../../interpolations/interpolateTemplate.js"
import { attachDynamicDom } from "../../interpolations/optimizers/attachDynamicDom.function.js"

export const blankHandler = function () {
  return undefined
}

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
      args: [appendTo, insertBefore],
      processor: paintAppend,
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
    for (const attr of node.at) {      
      const name = attr[0]
      const value = attr[1]
      const isSpecial = attr[2] || false

      processAttribute(
        values,
        name,
        domElement,
        support,
        howToSetFirstInputValue,
        context,
        isSpecial,
        counts,
        value
      )
    }
  }

  if (appendTo) {
    paintAppends.push({
      args: [appendTo, domElement],
      processor: paintAppend,
    })
  } else {
    paintCommands.push({
      processor: paintBefore,
      args: [insertBefore, domElement],
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

  if (owner) {
    paintAppends.push({
      processor: paintAppendText,
      args: [owner, string, (elm: Text) => textNode.domElement = elm],
    })
  } else {
    paintCommands.push({
      processor: paintBeforeText,
      args: [insertBefore, string, (elm: Text) => textNode.domElement = elm]
    })
  }
}
