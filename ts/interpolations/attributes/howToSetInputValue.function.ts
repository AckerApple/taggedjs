import { isObject } from "../../index.js"
import { paintContent } from "../../render/paint.function.js"

export type HowToSet = (
  element: HTMLElement,
  name: string,
  value: string,
) => any

// Maybe more performant for updates but seemingly slower for first renders
export function howToSetInputValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
  if (isObject(value)) {
    return howToSetInputObjectValue(element, name, value as Record<string, any>)
  }
  
  paintContent.push([howToSetFirstInputValue, [element, name, value]])
}

function howToSetInputObjectValue(
  element: HTMLElement,
  name: string,
  value: Record<string, any>
) {
  if( typeof (element as any)[name] !== 'object' ) {
    (element as any)[name] = {}
  }

  // Handle object values by setting properties directly
  for (const key in value) {
    const subValue = value[key]
    paintContent.push([setObjectValue, [element, name, key, subValue]])
  }

  if((element as any)[name].setProperty) {
    for (const key in value) {
      const subValue = value[key]
      paintContent.push([setPropertyValue, [element, name, key, subValue]])
    }
  }
}

export function howToSetStandAloneAttr(
  element: HTMLElement,
  name: string,
  _value: string | undefined | boolean
) {
  element.setAttribute(name, '')
}

export function howToSetFirstInputValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
  setNonFunctionInputValue(element, name, value)
}

export function setNonFunctionInputValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
  if (isObject(value)) {
    return howToSetInputObjectValue(element, name, value as Record<string, any>)
  }
  
  // for checked=true
  ;(element as any)[name] = value

  if(value === undefined || value === false || value === null) {
    element.removeAttribute(name)
    return
  }

  element.setAttribute(name, value as string)
}

function setPropertyValue(
  element: HTMLElement,
  name: string,
  key: string,
  value: any
) {
  ;(element as any)[name].setProperty(key, value)
}

/** main processor for things like <div style=${{ maxWidth: '100vw' }}> */
function setObjectValue(
  element: HTMLElement,
  name: string,
  key: string,
  value: any
) {
  ;(element as any)[name][key] = value
}
