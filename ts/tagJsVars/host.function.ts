import { paintAfters } from "../render/paint.function.js"
import { AnySupport, ContextItem, ValueTypes } from "../tag/index.js"
import { syncWrapCallback } from "../tag/output.function.js"
import { TagJsVar } from "./tagJsVar.type.js"

type HostCallback = (element: HTMLInputElement) => any
type Options = {
  onDestroy?: (element: HTMLInputElement) => any
}
type AllOptions = Options & {
  onDestroy: (element: HTMLInputElement) => any
  callback: HostCallback
}

/** Use to gain access to element */
export function host(
  callback: HostCallback,
  options: Options = {}
): HostValue {
  return {
    tagJsType: ValueTypes.host,
    processInit: processHost as any,
    delete: deleteHost,
    options: { callback, ...options } as AllOptions,
  }
}

function processHost(
  tagJsVar: HostValue,
  element: HTMLInputElement
) {
  tagJsVar.options.callback(element)
}

function deleteHost(
  contextItem: ContextItem,
) {
  const tagJsVar = contextItem.tagJsVar as HostValue
  const options = tagJsVar.options

  if(options.onDestroy) {
    if( contextItem.locked ) {
      console.log('destroy stop by locked!!!')
      return
    }

    const element = contextItem.element as Element
    
    const hostDestroy = function processHostDestroy() {
      options.onDestroy( element as HTMLInputElement)
    }

    contextItem.locked = true
    
    paintAfters.push([function hostCloser() {
      const stateOwner = (contextItem as any).stateOwner as AnySupport
      syncWrapCallback(
        [],
        hostDestroy,
        stateOwner,
      )
  
      delete contextItem.locked
    }, []])
  }
}

export type HostValue = TagJsVar & {
  tagJsType: typeof ValueTypes.host
  options: AllOptions
}
