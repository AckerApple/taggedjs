import { paintContent } from "../../tag/paint.function.js"

export type HowToSet = (element: Element, name: string, value: string) => any

export function howToSetInputValue(
  element: Element,
  name: string,
  value: string | undefined | boolean
) {
  paintContent.push(() => {
    if(value === undefined || value === false || value === null) {
      element.removeAttribute(name)
      return
    }
    element.setAttribute(name, value as string)
  })
}
