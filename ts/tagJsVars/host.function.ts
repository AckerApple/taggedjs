import { AnySupport, ContextItem, TagCounts, ValueTypes } from "../tag/index.js"
import { syncWrapCallback } from "../tag/output.function.js"
import { handleTagTypeChangeFrom } from "../tag/update/checkSubContext.function.js"
import { TagJsVar } from "./tagJsVar.type.js"

export type HostCallback = (
  element: HTMLInputElement,
  newHostValue: HostValue,
  context: ContextItem,
) => any

type Options = {
  onDestroy?: HostCallback
  onInit?: HostCallback
  // onUpdate?: (element: HTMLInputElement, hostValue: HostValue) => any
}
type AllOptions = Options & {
  onDestroy: HostCallback
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
  options.callback(element, newValue as HostValue, contextItem)

}

function processHost(
  element: HTMLInputElement,
  tagJsVar: HostValue,
  contextItem: ContextItem,
) {
  tagJsVar.options.callback(element, tagJsVar, contextItem)

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
      return options.onDestroy(element as HTMLInputElement, tagJsVar, contextItem)
    }

    
    const stateOwner = (contextItem as any).stateOwner as AnySupport
    syncWrapCallback(
      [],
      hostDestroy,
      stateOwner,
    )
  }
}

export type HostValue = TagJsVar & {
  tagJsType: typeof ValueTypes.host
  options: AllOptions
}
