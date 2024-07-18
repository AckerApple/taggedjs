import { paintAfters, paintContent } from "../../tag/paint.function.js"
import { elementInitCheck } from "./elementInitCheck.js";
import { isSpecialAction } from "./processAttribute.function.js";

const style = 'style'
const classS = 'class'

export function specialAttribute(
  name: string,
  value: any,
  element: Element,
) {
  if(isSpecialAction(name)) {
    switch (name) {
      case 'oninit':
        paintAfters.push(() => elementInitCheck(element, {added:0, removed:0}))
        break;

      case 'autofocus':
        paintAfters.push(() => (element as any).focus())
        break;

      case 'autoselect':
        paintAfters.push(() => (element as any).select())
        break;
    }
  }

  const names = name.split('.')
  const firstName = names[0]

  // style.position = "absolute"
  if(firstName === style) {
    paintContent.push(() => (element as any).style[names[1]] = value) // attribute changes should come first
    return
  }

  // Example: class.width-full = "true"
  if(firstName === classS) {
    names.shift()
    
    // truthy
    if(value) {
      for (const name of names) {
        /*
        if(element.classList.contains(name)) {
          continue
        }
        */
        paintContent.push(() => element.classList.add(name))
      }
      return
    }

    // falsy
    for (const name of names) {
      paintContent.push(() => element.classList.remove(name))
    }
  }
}
