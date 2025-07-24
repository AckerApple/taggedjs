import { AttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { AnySupport, ContextItem, TemplateValue, ValueTypes } from "../tag/index.js"
import { syncWrapCallback } from "../tag/output.function.js"
import { handleTagTypeChangeFrom } from "../tag/update/checkStillSubscription.function.js"
import { TagJsVar } from "./tagJsVar.type.js"

export type HostCallback = (
  element: HTMLInputElement,
  newHostValue: HostValue,
  context: AttributeContextItem,
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
    processInitAttribute: processHostAttribute,
    // TODO: maybe a host value can change?
    checkValueChange: () => -1,
    processInit: processHost as any, // This should be a throw error because only attribute is supported
    processUpdate: processHostUpdate,
    delete: deleteHost,
    options: { callback, ...options } as AllOptions,
  }
}

// Declare namespace for TypeScript visibility
// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace host {
  /** Attach a host to an element that only runs during initialization */
  const onInit: (callback: HostCallback) => HostValue
  
  /** Attach a host to an element that only runs during element destruction */
  const onDestroy: (callback: HostCallback) => HostValue
}

// Attach the functions to the host namespace
;(host as any).onInit = (callback: HostCallback): HostValue => {
  return host(() => {}, { onInit: callback })
}

;(host as any).onDestroy = (callback: HostCallback): HostValue => {
  return host(() => {}, { onDestroy: callback })
}

function processHostUpdate(
  newValue: TemplateValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const hasChanged = handleTagTypeChangeFrom(
    ValueTypes.host,
    newValue,
    // tagJsVar,
    ownerSupport,
    contextItem,
  )

  if( hasChanged ) {
    return hasChanged
  }

  const oldTagJsVar = contextItem.tagJsVar as HostValue
  const options = oldTagJsVar.options

  const element = (contextItem as any as AttributeContextItem).element as HTMLInputElement
  options.callback(
    element,
    newValue as unknown as HostValue,
    contextItem as any as AttributeContextItem,
  )
}

function processHostAttribute(
  name: string,
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  _tagJsVar: TagJsVar, // same as value not needed
  contextItem: AttributeContextItem,
) {
  return processHost(
    element as HTMLInputElement,
    value,
    contextItem as any as AttributeContextItem,
  )
}

function processHost(
  element: HTMLInputElement,
  tagJsVar: HostValue,
  contextItem: AttributeContextItem,
) {
  tagJsVar.options.callback(element, tagJsVar, contextItem)

  const options = tagJsVar.options
  if(options.onInit) {
    // const element = contextItem.element as HTMLInputElement
    options.onInit(element, tagJsVar, contextItem)
  }
}

function deleteHost(
  contextItem: ContextItem,
) {
  const attrContext = contextItem as any as AttributeContextItem
  const tagJsVar = attrContext.tagJsVar as HostValue
  const options = tagJsVar.options

  if(options.onDestroy) {
    const element = attrContext.element as Element
    
    const hostDestroy = function processHostDestroy() {
      return options.onDestroy(
        element as HTMLInputElement,
        tagJsVar,
        attrContext,
      )
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
