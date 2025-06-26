import { paintAfters, paintContent } from "../../render/paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js";
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { InputElementTargetEvent, TagJsEvent } from "../../TagJsEvent.type.js";
import { SpecialDefinition } from "../../render/attributes/Special.types.js";

/** handles init, destroy, autofocus, autoselect, style., class. */
export function specialAttribute(
  name: string,
  value: any,
  element: Element,
  specialName: SpecialDefinition,
  support: AnySupport,
  counts: TagCounts,
) {
  switch (specialName) {
    case 'init': { // aka oninit
      const stagger = counts.added++

      // run delayed after elements placed down
      paintAfters.push([paintSpecialAttribute, [element, stagger, value]])

      return
    }

    case 'destroy': { // aka ondestroy
      const stagger = counts.removed++
      const global = support.context.global      
      global.destroys = global.destroys || []
      
      global.destroys.push(() => {
        const event = {
          target: element,
          stagger,
        } as unknown as InputElementTargetEvent

        return value(event) // call destroy/ondestroy
      })
            
      return
    }

    case 'autofocus':
      paintAfters.push([autofocus, [element]])
      return

    case 'autoselect':
      paintAfters.push([autoselect, [element]])
      return

    case 'style': {
      const names = name.split('.')      
      paintContent.push([paintStyle, [element, names, value]]) // attribute changes should come first
      
      return
    }

    case 'class':
      processSpecialClass(name, value, element)
      return
  }

  throw new Error(`Invalid special attribute of ${specialName}. ${name}`)
}

function paintStyle(
  element: HTMLElement,
  names: string[],
  value: any
) {
  const smallName = names[1] as any
  
  element.style[ smallName ] = value
  element.style.setProperty(smallName, value)
}

function processSpecialClass(
  name: string,
  value: any,
  element: Element,
) {
  const names = name.split('.')
  names.shift() // remove class
  
  // truthy
  if(value) {
    for (const name of names) {
      paintContent.push([classListAdd, [element, name]])
    }
    return
  }

  // falsy
  for (const name of names) {
    paintContent.push([classListRemove, [element, name]])
  }
}

function classListAdd(
  element: Element, name: string
){
  element.classList.add(name)
}

function classListRemove(
  element: Element, name: string
){
  element.classList.remove(name)
}

function autoselect(element: HTMLElement) {
  (element as any).select()
}

function autofocus(element: HTMLElement) {
  (element as any).focus()
}

function paintSpecialAttribute(
  element: HTMLElement,
  stagger: number,
  value: any
) {
  const event = {
    target: element,
    stagger,
  } as TagJsEvent
  value(event) // call init/oninit
}