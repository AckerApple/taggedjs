// taggedjs-no-compile

import { DomObjectChildren, DomObjectElement, DomObjectText } from "../../interpolations/optimizers/ObjectNode.types.js"
import { paintAppend, paintAppendElementString, paintAppends, paintBeforeElementString, paintCommands } from "../paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { ObjectChildren } from "../../interpolations/optimizers/LikeObjectElement.type.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { attachDynamicDom } from "../../interpolations/optimizers/attachDynamicDom.function.js"
import { TagJsVar } from "../../tagJsVars/tagJsVar.type.js"
import { attachDomElement } from "./attachDomElement.function.js"
import { Subject } from "../../subject/Subject.class.js"

export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: AnySupport,
  parentContext: ContextItem,
  depth: number, // used to know if dynamic variables live within parent owner tag/support
  appendTo?: Element,
  insertBefore?: Text,
): {
  contexts: ContextItem[]
  dom: DomObjectChildren // return of children created. Used to attach `ch` for children to a node
} {
  const contexts = support.context.contexts
  const dom: DomObjectChildren = []

  if(appendTo && insertBefore === undefined) {
    insertBefore = document.createTextNode(empty)
    paintAppends.push([paintAppend, [appendTo, insertBefore]])
    appendTo = undefined
  }

  // loop map of elements that need to be put down on document
  for (let index=0; index < nodes.length; ++index) {
    const node = (nodes as DomObjectElement[])[index]
    
    const value = node.v as ContextItem
    const isNum = !isNaN(value as unknown as number)
    
    if(isNum) {
      const valueIndex = contexts.length
      const value = values[ valueIndex ]

      attachDynamicDom(
        value,
        contexts,
        support,
        parentContext,
        depth,
        appendTo as HTMLElement,
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

    const domElement = newNode.domElement = document.createElement(node.nn)

    // Create parent context for attributes first
    const newParentContext: ContextItem = {
      isAttrs: true,
      element: domElement,
      parentContext,
      contexts: [],
      destroy$: new Subject(),
      tagJsVar: {
        tagJsType: 'new-parent-context'
      } as TagJsVar,
      valueIndex: -1,
      withinOwnerElement: true,
    }

    // one single html element. This is where attribute processing takes place
    const attributeContexts = attachDomElement(
      domElement,
      node,
      values,
      support,
      newParentContext,
      appendTo,
      insertBefore,
    )

    // Update parent context with element and attribute contexts
    newParentContext.element = domElement
    newParentContext.contexts = attributeContexts

    if (node.ch) {
      newNode.ch = attachDomElements(
        node.ch,
        values,
        support,
        newParentContext,
        // contexts,
        depth + 1,
        domElement,
        insertBefore,
      ).dom
    }
  }

  return {dom, contexts}
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
