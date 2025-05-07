import { AnySupport } from '../../tag/AnySupport.type.js'
import { addSupportEventListener } from './addSupportEventListener.function.js'
import { Callback } from './bindSubjectCallback.function.js'

export function processAttributeFunction(
  element: Element,
  newAttrValue: Callback,
  support: AnySupport,
  attrName: string
) {
  const fun = function (...args: any[]) {
    return fun.tagFunction(element, args)
  }

  // access to original function
  fun.tagFunction = newAttrValue
  fun.support = support

  addSupportEventListener(
    support.appSupport,
    attrName,
    element, // support.appSupport.appElement as Element,
    fun,
  )
}
