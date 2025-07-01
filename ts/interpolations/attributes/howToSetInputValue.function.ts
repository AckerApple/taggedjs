import { paintContent } from "../../render/paint.function.js"

export type HowToSet = (element: HTMLElement, name: string, value: string) => any

// Maybe more performant for updates but seemingly slower for first renders
export function howToSetInputValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean
) {
  paintContent.push([howToSetFirstInputValue, [element, name, value]])
}

export function howToSetFirstInputValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean
) {
  if(value === undefined || value === false || value === null) {
    element.removeAttribute(name)
    return
  }

  element.setAttribute(name, value as string)
}
