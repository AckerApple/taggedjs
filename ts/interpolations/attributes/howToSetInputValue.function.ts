import { isObject } from "../../index.js"
import { paintAfters, paintContent } from "../../render/paint.function.js"

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
  
  paintContent.push([setNonFunctionInputValue, [element, name, value]])
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

/* used for <input checked /> */
export function howToSetStandAloneAttr(
  element: HTMLElement,
  name: string,
  _value: string | undefined | boolean
) {
  element.setAttribute(name, '')
}

export function setNonFunctionInputValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
  if (isObject(value)) {
    return howToSetInputObjectValue(element, name, value as Record<string, any>)
  }
  
  setSimpleAttribute(
    element,
    name,
    value
  )
}

/** used for checked, selected, and so on */
export function setBooleanAttribute(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean
) {  
  if( value ) {
    (element as HTMLOptionElement)[name as 'selected'] = true
  } else {
    (element as HTMLOptionElement)[name as 'selected'] = false
  }
}

export function setSimpleAttribute(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
    // for checked=true
  ;(element as any)[name] = value

  if(value === undefined || value === false || value === null) {
    element.removeAttribute(name)
    return
  }

  element.setAttribute(name, value as string)
  /*
  paintAfters.push([(element: HTMLInputElement) => {
    element.value = value as string
  }, [element]])
  */
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
