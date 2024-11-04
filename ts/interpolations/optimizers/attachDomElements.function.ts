// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { DomObjectChildren, DomObjectElement, DomObjectText } from "./ObjectNode.types.js"
import { InterpolateSubject } from "../../tag/update/processFirstSubject.utils.js"
import { howToSetInputValue } from "../attributes/howToSetInputValue.function.js"
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js"
import { AnySupport } from "../../tag/Support.class.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js"
import { Context, ContextItem } from "../../tag/Context.types.js"
import { addOneContext, TagGlobal } from "../../tag/index.js"
import { ObjectChildren } from "./LikeObjectElement.type.js"
import { isSubjectInstance } from "../../isInstance.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"

// ??? TODO: This could be done within exchangeParsedForValues to reduce loops
export function attachDomElements(
  nodes: ObjectChildren,
  values: any[],
  support: AnySupport,
  counts: Counts, // used for animation stagger computing
  context: Context,
  depth: number, // used to know if dynamic variables live within parent owner tag/support
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
        depth,
      )
      continue
    }

    if (node.nn === 'text') {
      const textNode = (newNode as any as DomObjectText)
      const string = textNode.tc = (node as any as DomObjectText).tc
      
      x.innerHTML = string
      const domElement = textNode.domElement = document.createTextNode(x.innerText)

      // TODO: for debugging only
      ;(domElement as any).id = `tp_${context.length}_${values.length}`
      
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
      node.at.map(attr => {
        const name = attr[0]
        const value = attr[1]
        const isSpecial = attr[2] as boolean | undefined
        
        processAttribute(
          values,
          name,
          domElement,
           support,
          howToSetInputValue,
          context,
          value,
          isSpecial,
        )
      })
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
        depth + 1,
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
  depth: number, // used to indicate if variable lives within an owner's element
) {
  const subVal = values[ context.length ]
  const marker = document.createTextNode(empty)

  // attach an identifier that can be read in dom reader
  ;(marker as any).id = `dvp_${context.length}_${values.length}`
  
  const contextItem = addOneContext(
    subVal,
    context,
    depth > 0,
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
    `rvp_${context.length}_${values.length}`,
    owner,
  )

  const global2 = support.subject.global as TagGlobal
  delete global2.locked
  contextItem.value = subVal

  return
}