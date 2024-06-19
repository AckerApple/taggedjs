import { Context } from '../tag/Tag.class.js'
import { Support } from '../tag/Support.class.js'
import { processAttribute } from './processAttribute.function.js'

export type HowToSet = (element: Element, name: string, value: string) => any

function howToSetAttribute(
  element: Element,
  name: string,
  value: string
) {
  element.setAttribute(name, value)
}

export function howToSetInputValue(
  element: Element,
  name: string,
  value: string
) {
  element.setAttribute(name, value)
}

export function interpolateAttributes(
  element: Element,
  scope: Context,
  ownerSupport: Support,
) {
  const attrNames = element.getAttributeNames()

  let howToSet = howToSetAttribute

  for (let index = 0; index < attrNames.length; ++index) {
    const attrName = attrNames[index]
    const value = element.getAttribute(attrName)
    processAttribute(
      [attrName, value], element, scope, ownerSupport, howToSet
    )
  }
}
