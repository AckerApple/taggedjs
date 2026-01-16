import { ContextItem } from '../tag/index.js'
import { ElementFunction } from './ElementFunction.type.js'

type AttrFn = (item: any, args: [name: string | unknown, value?: any]) => any

export type AttributeCallable = {
  (strings: TemplateStringsArray, ...values: any[]): ElementFunction
  (value: string): ElementFunction
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
  return function (
    item: any,
    stringsOrValue: TemplateStringsArray | string | object | ((context: ContextItem) => any),
    values: any[],
  ): ElementFunction {
    if (isTemplateStringsArray(stringsOrValue)) {
      const attrValue = stringsOrValue.reduce(
        (all, chunk, index) => all + chunk + (values[index] ?? ''),
        ''
      )
      return attr(item, [attrName, attrValue])
    }

    return attr(item, [attrName, stringsOrValue])
  }
}
