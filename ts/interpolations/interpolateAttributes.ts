export type HowToSet = (element: Element, name: string, value: string) => any

export function howToSetInputValue(
  element: Element,
  name: string,
  value: string
) {
  element.setAttribute(name, value)
}
