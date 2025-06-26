import { paintAfters } from "../render/paint.function.js"
import { AnySupport, ContextItem, TagCounts, ValueTypes } from "../tag/index.js"
import { syncWrapCallback } from "../tag/output.function.js"
import { handleTagTypeChangeFrom } from "../tag/update/checkSubContext.function.js"
import { TagJsVar } from "./tagJsVar.type.js"

type HostCallback = (
  element: HTMLInputElement,
  newHostValue: HostValue,
) => any
type Options = {
  onDestroy?: (element: HTMLInputElement) => any
  onInit?: (
    element: HTMLInputElement,
    hostValue: HostValue,
    context: ContextItem,
  ) => any
  // onUpdate?: (element: HTMLInputElement, hostValue: HostValue) => any
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
    processUpdate: processHostUpdate,
    delete: deleteHost,
    options: { callback, ...options } as AllOptions,
  }
}

function processHostUpdate(
  newValue: unknown,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
  _values: any[],
  counts: TagCounts,
) {
  const hasChanged = handleTagTypeChangeFrom(
    ValueTypes.host,
    newValue,
    ownerSupport,
    contextItem,
    counts,
  )
  if( hasChanged ) {
    return hasChanged
  }

  const tagJsVar = contextItem.tagJsVar as HostValue
  const options = tagJsVar.options

  const element = contextItem.element as HTMLInputElement
  options.callback(element, newValue as HostValue)

}

function processHost(
  element: HTMLInputElement,
  tagJsVar: HostValue,
  contextItem: ContextItem,
) {
  tagJsVar.options.callback(element, tagJsVar)

  const options = tagJsVar.options
  if(options.onInit) {
    const element = contextItem.element as HTMLInputElement
    options.onInit(element, tagJsVar, contextItem)
  }
}

function deleteHost(
  contextItem: ContextItem,
) {
  const tagJsVar = contextItem.tagJsVar as HostValue
  const options = tagJsVar.options

  if(options.onDestroy) {
    const element = contextItem.element as Element
    
    const hostDestroy = function processHostDestroy() {
      options.onDestroy( element as HTMLInputElement)
    }

    paintAfters.push([function hostCloser() {
      const stateOwner = (contextItem as any).stateOwner as AnySupport
      syncWrapCallback(
        [],
        hostDestroy,
        stateOwner,
      )
    }, []])
  }
}

export type HostValue = TagJsVar & {
  tagJsType: typeof ValueTypes.host
  options: AllOptions
}
