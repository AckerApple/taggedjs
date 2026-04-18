import { ContextItem } from '../tag/index.js'
import { ElementFunction } from './ElementFunction.type.js'

type AttrFn = (item: any, args: [name: string | unknown, value?: any]) => any

export type AttributeCallable = {
  (strings: TemplateStringsArray, ...values: any[]): ElementFunction
  (value: string | boolean | number): ElementFunction
  (value: (context: ContextItem) => any): ElementFunction
}

function isTemplateStringsArray(value: any): value is TemplateStringsArray {
  return (
    Array.isArray(value) &&
    Object.prototype.hasOwnProperty.call(value, 'raw')
  )
}

export type AttrCallableInternal = (
  item: any,
  stringsOrValue: TemplateStringsArray | string | object | ((context: ContextItem) => any),
  values: any[],
) => ElementFunction

export function makeAttrCallable(attrName: string, attr: AttrFn): AttrCallableInternal {
  return function makeAttrCallableFunction(
    item: any,
    stringsOrValue: TemplateStringsArray | string | object | ((context: ContextItem) => any),
    values: any[],
  ): ElementFunction {
    if (isTemplateStringsArray(stringsOrValue)) {
      const parts: string[] = []
      for (let index = 0; index < stringsOrValue.length; ++index) {
        parts.push(stringsOrValue[index] as string)
        if (index < values.length) {
          parts.push(String(values[index] ?? ''))
        }
      }

      const attrValue = parts.join('')
      return attr(item, [attrName, attrValue])
    }

    return attr(item, [attrName, stringsOrValue])
  }
}
