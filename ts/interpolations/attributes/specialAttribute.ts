import { paintAfters, paintContent } from "../../tag/paint.function.js"
import { InputElementTargetEvent } from "./ElementTargetEvent.interface.js";
import { SpecialDefinition } from "./processAttribute.function.js";

export function specialAttribute(
  name: string,
  value: any,
  element: Element,
  specialName: SpecialDefinition
) {
  switch (specialName) {
    case 'oninit' as any:
    case 'init':
      paintAfters.push(() => {
        const event = { target: element, stagger: 0 } as unknown as InputElementTargetEvent
        const onInit = value
        onInit(event)
      })
      return

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