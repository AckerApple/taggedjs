// taggedjs-no-compile

import { DomObjectChildren, DomObjectElement, DomObjectText } from "../../interpolations/optimizers/ObjectNode.types.js"
import { HowToSet, howToSetFirstInputValue, howToSetStandAloneAttr } from "../../interpolations/attributes/howToSetInputValue.function.js"
import { paintAppend, paintAppendElementString, paintAppends, paintBefore, paintBeforeElementString, paintCommands } from "../paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { ObjectChildren } from "../../interpolations/optimizers/LikeObjectElement.type.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { attachDynamicDom } from "../../interpolations/optimizers/attachDynamicDom.function.js"
import { SupportContextItem } from "../../index.js"
import { TagJsVar } from "../../tagJsVars/tagJsVar.type.js"

export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: AnySupport,
  parentContext: ContextItem,
  contexts: ContextItem[],
  depth: number, // used to know if dynamic variables live within parent owner tag/support
  appendTo?: Element,
  insertBefore?: Text,
): {
  contexts: ContextItem[]
  dom: DomObjectChildren // return of children created. Used to attach `ch` for children to a node
} {
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

    // one single html element. This is where attribute processing takes place
    const { attributeContexts, domElement } = attachDomElement(
      newNode,
      node,
      values,
      support,
      contexts,
      appendTo,
      insertBefore,
    )

    const newParentContext: ContextItem = {
      isAttrs: true,
      parentContext,
      contexts: attributeContexts,
      
      tagJsVar: {
        tagJsType: 'new-parent-context'
      } as TagJsVar,
      valueIndex: -1,
      valueIndexSetBy: 'attachDomElements',
      withinOwnerElement: true,
    }

    if (node.ch) {
      newNode.ch = attachDomElements(
        node.ch,
        values,
        support,
        newParentContext,
        contexts,
        depth + 1,
        domElement,
        insertBefore,
      ).dom
    }
  }

  return {dom, contexts}
}

function attachDomElement(
  newNode: DomObjectElement,
  node: DomObjectElement,
  values: any[],
  support: AnySupport,
  contexts: ContextItem[],
  appendTo: Element | undefined,
  insertBefore: Text | undefined,
): {
  domElement: HTMLElement
  attributeContexts: ContextItem[]
} {
  const domElement = newNode.domElement = document.createElement(node.nn)
  const attributeContexts: ContextItem[] = []
  
  // attributes that may effect style, come first for performance
  if (node.at) {
    for (const attr of node.at) {      
      const name = attr[0]
      const value = attr[1]
      const isSpecial = attr[2] || false
      const howToSet: HowToSet = attr.length > 1 ? howToSetFirstInputValue : howToSetStandAloneAttr

      const newContext = processAttribute(
        values,
        name,
        domElement,
        support,
        howToSet,
        contexts,
        isSpecial,
        value,
      )

      if(typeof newContext === 'object') {
        attributeContexts.push(newContext as ContextItem)
      }
    }
  }

  if (appendTo) {
    paintAppends.push([paintAppend, [appendTo, domElement]])
  } else {
    paintCommands.push([paintBefore, [insertBefore, domElement]])
  }
  
  return { domElement, attributeContexts }
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
