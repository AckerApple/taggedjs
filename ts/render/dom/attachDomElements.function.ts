// taggedjs-no-compile

import { DomObjectChildren, DomObjectElement, DomObjectText } from "../../interpolations/optimizers/ObjectNode.types.js"
import { howToSetFirstInputValue } from "../../interpolations/attributes/howToSetInputValue.function.js"
import { paintAppend, paintAppendElementString, paintAppends, paintBefore, paintBeforeElementString, paintCommands } from "../paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { ObjectChildren } from "../../interpolations/optimizers/LikeObjectElement.type.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { attachDynamicDom } from "../../interpolations/optimizers/attachDynamicDom.function.js"
import { TagCounts } from "../../tag/TagCounts.type.js"

export const blankHandler = function blankHandler() {
  return undefined
}

export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: AnySupport,
  counts: TagCounts, // used for animation stagger computing
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
    paintAppends.push([paintAppend, [appendTo, insertBefore]])
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
  counts: TagCounts,
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
    paintAppends.push([paintAppend, [appendTo, domElement]])
  } else {
    paintCommands.push([paintBefore, [insertBefore, domElement]])
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
    paintAppends.push([paintAppendElementString, [owner, string, function afterAppenDomText(elm: Text){
      textNode.domElement = elm
    }]])
    return
  }

  paintCommands.push([paintBeforeElementString, [insertBefore, string, function afterInsertDomText(elm: Text) {
    textNode.domElement = elm
  }]])
}
