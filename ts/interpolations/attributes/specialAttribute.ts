import { paintAfters, paintContent } from "../../render/paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js";
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { InputElementTargetEvent } from "./ElementTargetEvent.interface.js";
import { SpecialDefinition } from "../../render/attributes/processAttribute.function.js";

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
    // case 'oninit' as any:
    case 'init': {
      const stagger = counts.added

      // run delayed after elements placed down
      paintAfters.push(function paintSpecialAttribute() {
        const event = {
          target: element,
          stagger,
        } as unknown as InputElementTargetEvent
        value(event) // call init/oninit
      })

      return
    }

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