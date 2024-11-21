import { paintAfters, paintContent } from "../../tag/paint.function.js"
import { AnySupport } from "../../tag/Support.class.js";
import { Counts } from "../interpolateTemplate.js";
import { InputElementTargetEvent } from "./ElementTargetEvent.interface.js";
import { SpecialDefinition } from "./processAttribute.function.js";

export function specialAttribute(
  name: string,
  value: any,
  element: Element,
  specialName: SpecialDefinition,
  support: AnySupport,
  counts: Counts,
) {
  switch (specialName) {
    // case 'oninit' as any:
    case 'init': {
      const stagger = counts.added

      // run delayed after elements placed down
      paintAfters.push(() => {
        const event = {
          target: element,
          stagger,
        } as unknown as InputElementTargetEvent
        value(event) // call init/oninit
      })

      return
    }

    // case 'ondestroy' as any:
    case 'destroy': {
      const stagger = ++counts.removed
      const global = support.subject.global      
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
      paintAfters.push(() => (element as any).focus())
      return

    case 'autoselect':
      paintAfters.push(() => (element as any).select())
      return

    case 'style': {
      const names = name.split('.')
      // names.shift() // remove 'style'
      paintContent.push(() => (element as any).style[names[1]] = value) // attribute changes should come first
      return
    }

    case 'class':
      processSpecialClass(name, value, element)
      return
  }

  throw new Error(`Invalid special attribute of ${specialName}. ${name}`)
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
      paintContent.push(() => element.classList.add(name))
    }
    return
  }

  // falsy
  for (const name of names) {
    paintContent.push(() => element.classList.remove(name))
  }
}