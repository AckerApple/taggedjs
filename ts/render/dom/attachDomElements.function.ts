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
import { isFunction, SupportContextItem } from "../../index.js"

export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: AnySupport,
  parentContext: SupportContextItem,
  depth: number, // used to know if dynamic variables live within parent owner tag/support
  appendTo?: Element,
  insertBefore?: Text,
): {
  contexts: ContextItem[]
  dom: DomObjectChildren // return of children created. Used to attach `ch` for children to a node
} {
  const context = support.context as SupportContextItem
  const contexts = context.contexts
  parentContext = context
  // const contexts = parentContext.contexts
  const dom: DomObjectChildren = []

  if(appendTo && insertBefore === undefined) {
    insertBefore = document.createTextNode(empty)
    paintAppends.push([paintAppend, [appendTo, insertBefore]])
    appendTo = undefined
  }

  // loop map of elements that need to be put down on document
  for (let index=0; index < nodes.length; ++index) {
    const node = (nodes as DomObjectElement[])[index]
    
    const v = node.v as ContextItem
    const isNum = !isNaN(v as unknown as number)

    if(isNum) {
      // const valueIndex = context.varCounter // contexts.length
      // const valueIndex = (parentContext as SupportContextItem).varCounter // contexts.length
      const valueIndex = Number(v) // (parentContext as SupportContextItem).varCounter // contexts.length
      const realValue = values[ valueIndex ]
      const isSkipFun = isFunction(realValue) && realValue.tagJsType === undefined

      if(isSkipFun) {
        ++parentContext.varCounter
        // TODO: I dont think we ever get in here?
        continue
      }

      const contextItem = attachDynamicDom(
        realValue,
        contexts,
        support,
        parentContext,
        depth,
        appendTo as HTMLElement,
        insertBefore,
      )

      contextItem.valueIndex = valueIndex

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
      updateCount: 0,
      isAttrs: true,
      element: domElement,
      parentContext,
      contexts: [],
      destroy$: new Subject(),
      render$: new Subject(),
      tagJsVar: {
        tagJsType: 'new-parent-context'
      } as TagJsVar,
      valueIndex: -1,
      withinOwnerElement: true,
    }

    ;(newParentContext as SupportContextItem).varCounter = 0

    // one single html element. This is where attribute processing takes place
    attachDomElement(
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

    if (node.ch) {
      newNode.ch = attachDomElements(
        node.ch,
        values,
        support,
        newParentContext as SupportContextItem,
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
