// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { DomObjectChildren, DomObjectElement, DomObjectText } from "./ObjectNode.types.js"
import { InterpolateSubject, TemplateValue } from "../../tag/update/processFirstSubject.utils.js"
import { howToSetInputValue } from "../attributes/howToSetInputValue.function.js"
import { paintAfters, paintAppends, paintInsertBefores } from "../../tag/paint.function.js"
import { AnySupport } from "../../tag/getSupport.function.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js"
import { ContextItem } from "../../tag/Context.types.js"
import { addOneContext, TagGlobal } from "../../tag/index.js"
import { ObjectChildren } from "./LikeObjectElement.type.js"
import { isSubjectInstance } from "../../isInstance.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"
import { updateExistingValue } from "../../tag/update/updateExistingValue.function.js"

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
  subs: SubToTemplateOptions[] = [],
): {
  context: ContextItem[]
  subs: SubToTemplateOptions[]
  dom: DomObjectChildren
} {
  // TODO: This appears unused
  const dom: DomObjectChildren = []

  if(appendTo && insertBefore === undefined && depth > 0) {
    insertBefore = document.createTextNode(empty)

    paintAppends.push({
      element: insertBefore,
      relative: appendTo,
    })

    appendTo = undefined
  }

  for (let index=0; index < nodes.length; ++index) {
    const node = (nodes as DomObjectElement[])[index]
    
    // TODO: This appears unused
    const newNode = {} as DomObjectElement // DomObjectText
    dom.push(newNode)

    const value = node.v as ContextItem
    const isNum = !isNaN(value as unknown as number)
    
    if(isNum) {
      const index = context.length
      const value = values[ index ]

      attachDynamicDom(
        value,
        index,
        context,
        support,
        subs,
        counts,
        depth,
        appendTo,
        insertBefore,
      )
      continue
    }

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
        subs,
      ).dom
    }
  }

  return {subs, dom, context}
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
    node.at.map(attr => {
      const name = attr[0]
      const value = attr[1]
      const isSpecial = attr[2] || false

      processAttribute(
        values,
        name,
        domElement,
        support,
        howToSetInputValue,
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

function attachDynamicDom(
  value: any,
  index: number,
  context: ContextItem[],
  support: AnySupport,
  subs:SubToTemplateOptions[],
  counts: Counts, // used for animation stagger computing
  depth: number, // used to indicate if variable lives within an owner's element
  appendTo?: Element,
  insertBefore?: Text
) {  
  const marker = document.createTextNode(empty)
  const isWithinOwnerElement = depth > 0
  const contextItem = addOneContext(
    value,
    context,
    isWithinOwnerElement,
  )

  contextItem.placeholder = marker

  if(appendTo) {
    paintAppends.push({
      relative: appendTo,
      element: marker,
    })
  } else {
    paintInsertBefores.push({
      relative: insertBefore as Text,
      element: marker,
    })
  }

  if(isSubjectInstance(value)) {
    subs.push({
      insertBefore: marker,
      appendTo,
      subject: value as InterpolateSubject,
      support, // ownerSupport,
      counts,
      contextItem,
    })

    contextItem.handler = blankHandler

    return
  }

  // how to handle value updates
  contextItem.handler = (newValue, _newValues, newSupport, newContextItem) =>
    updateExistingValue(
      newContextItem,
      newValue as TemplateValue,
      newSupport,
    )


  const global = support.subject.global as TagGlobal
  global.locked = true

  processFirstSubjectValue(
    value,
    contextItem,
    support,
    counts,
    appendTo,
    insertBefore,
  )

  const global2 = support.subject.global as TagGlobal
  delete global2.locked
  contextItem.value = value

  return
}
