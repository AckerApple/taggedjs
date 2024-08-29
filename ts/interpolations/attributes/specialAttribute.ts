import { paintAfters, paintContent } from "../../tag/paint.function.js"
import { elementInitCheck } from "./elementInitCheck.js";
import { SpecialDefinition } from "./processAttribute.function.js";

const style = 'style'
const classS = 'class'

// const styleStart = style + '.'
// const classStart = classS + '.'

export function specialAttribute(
  name: string,
  value: any,
  element: Element,
  specialName: SpecialDefinition
) {
  switch (specialName) {
    case 'oninit':
      paintAfters.push(() => elementInitCheck(element, {added:0, removed:0}))
      return

    case 'autofocus':
      paintAfters.push(() => (element as any).focus())
      return

    case 'autoselect':
      paintAfters.push(() => (element as any).select())
      return

    case 'style':
      const names = name.split('.')
      // names.shift() // remove 'style'
      paintContent.push(() => (element as any).style[names[1]] = value) // attribute changes should come first
      return

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