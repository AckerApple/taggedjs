import { Context } from "../tag/Tag.class"
import { TagSupport } from "../tag/TagSupport.class"
import { processAttribute } from "./processAttribute.function"

export type HowToSet = (element: Element, name: string, value: string) => any

function howToSetAttribute(
  element: Element,
  name: string,
  value: string
) {
  element.setAttribute(name, value)
}

function howToSetInputValue(
  element: Element,
  name: string,
  value: string
) {
  (element as any)[name] = value
}

export function interpolateAttributes(
  child: Element,
  scope: Context,
  ownerSupport: TagSupport,
) {
  const attrNames = child.getAttributeNames()

  let howToSet = howToSetAttribute

  for (let index = 0; index < attrNames.length; ++index) {
    const attrName = attrNames[index]
    if(child.nodeName === 'INPUT' && attrName === 'value') {
      howToSet = howToSetInputValue
    }

    const value = child.getAttribute(attrName)
    processAttribute(attrName, value, child, scope, ownerSupport, howToSet)

    howToSet = howToSetAttribute // put back
  }
}
