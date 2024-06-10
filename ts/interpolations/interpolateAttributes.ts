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

function howToSetInputValue(
  element: Element,
  name: string,
  value: string
) {
  (element as any)[name] = value
}

const INPUT = 'INPUT'
const valueS = 'value'

export function interpolateAttributes(
  child: Element,
  scope: Context,
  ownerSupport: Support,
) {
  const attrNames = child.getAttributeNames()

  let howToSet = howToSetAttribute

  for (let index = 0; index < attrNames.length; ++index) {
    const attrName = attrNames[index]
    if(child.nodeName === INPUT && attrName === valueS) {
      howToSet = howToSetInputValue
    }

    const value = child.getAttribute(attrName)
    processAttribute(attrName, value, child, scope, ownerSupport, howToSet)

    howToSet = howToSetAttribute // put back
  }
}
