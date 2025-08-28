import { paintContent } from "../../render/paint.function.js"
import { SpecialDefinition } from "../../render/attributes/Special.types.js";

/** handles autofocus, autoselect, style., class. */
export function specialAttribute(
  name: string,
  value: any,
  element: Element,
  specialName: SpecialDefinition,
) {
  switch (specialName) {
    case 'autofocus':
      paintContent.push([autofocus, [element]])
      return

    case 'autoselect':
      paintContent.push([autoselect, [element]])
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
  
  element.style[ smallName ] = value // style.backgroundGround
  element.style.setProperty(smallName, value) // style.background-ground
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