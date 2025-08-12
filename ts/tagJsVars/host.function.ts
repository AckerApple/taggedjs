import { AttributeContextItem, HostAttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { AnySupport, ContextItem, TemplateValue, ValueTypes } from "../tag/index.js"
import { syncWrapCallback } from "../tag/output.function.js"
import { handleTagTypeChangeFrom } from "../tag/update/checkStillSubscription.function.js"
import { removeContextInCycle, setContextInCycle } from "../tag/cycles/setContextInCycle.function.js"
import { MatchesInjection, TagJsVar } from "./tagJsVar.type.js"

/** On specific host life cycles, a callback can be called. 
 * @state always an object */
export type HostCallback = (...args: any[]) => any

type Options = {
  onDestroy?: HostCallback
  onInit?: HostCallback
  // onUpdate?: (element: HTMLInputElement, hostValue: HostValue) => any
}
type AllOptions = Options & {
  arguments?: any[]
  onDestroy: HostCallback
  callback: HostCallback
}

export type HostValueFunction<T extends ((args: any[]) => any)> = HostValue & T

/** Use to gain access to element
 * @callback called every render
 */
export function host<T extends HostCallback>(
  callback: T,
  options: Options = {}
): HostValueFunction<T> {
  const hostValue = {
    tagJsType: ValueTypes.host,
    processInitAttribute: processHostAttribute,
    // TODO: maybe a host value can change?
    checkValueChange: () => -1,
    processInit: processHost, // This should be a throw error because only attribute is supported
    processUpdate: processHostUpdate,
    delete: deleteHost,
    options: { callback, ...options } as AllOptions,
    matchesInjection(inject: any): boolean {
      // Check if the inject target is a host with the same callback
      return inject?.options?.callback === callback
    },
  }

  const returnFunction = function hostWrap(...args: any[]) {
    ;(returnFunction as unknown as HostValue).options.arguments = args
    return returnFunction
  }

  Object.assign(returnFunction, hostValue)

  return returnFunction as HostValueFunction<T>
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
  const oldOptions = oldTagJsVar.options

  // const element = (contextItem as any as AttributeContextItem).element as HTMLInputElement
  const newHost = newValue as unknown as HostValue

  const args = (newHost.options.arguments || oldOptions.arguments || [])
  contextItem.returnValue = newHost.options.callback(...args)
  /*
  newHost.options.callback(
    element,
    newValue as unknown as HostValue,
    contextItem as any as AttributeContextItem,
    (contextItem as HostAttributeContextItem).state,
  )
  */
}

function processHostAttribute(
  name: string,
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  _tagJsVar: TagJsVar, // same as value not needed
  contextItem: AttributeContextItem,
) {
  return processHost(
    value,
    contextItem as any as AttributeContextItem,
  )
}

/* Only runs on host() init */
function processHost(
  tagJsVar: TagJsVar,
  contextItem: ContextItem,
) {
  const element = contextItem.element
  const state = (contextItem as HostAttributeContextItem).state = {}
  
  setContextInCycle(contextItem)

  procesHostTagJsVar(
    element as HTMLInputElement,
    tagJsVar as HostValue,
    contextItem,
    state,
  )

  removeContextInCycle()
}

function procesHostTagJsVar(
  element: HTMLInputElement,
  tagJsVar: HostValue,
  contextItem: ContextItem,
  state: any,
) {
  // tagJsVar.options.callback(element, tagJsVar, contextItem, state)
  // const oldOptions = (contextItem.tagJsVar as HostValue).options
  //const args = (tagJsVar.options.arguments || oldOptions?.arguments || [])
  const args = tagJsVar.options.arguments || []
  const returnValue = tagJsVar.options.callback(...args)
  
  // Store the return value for tag.inject to access
  contextItem.returnValue = returnValue

  const options = tagJsVar.options
  if(options.onInit) {
    // const element = contextItem.element as HTMLInputElement
    options.onInit(element, tagJsVar, contextItem, state)
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
      setContextInCycle(contextItem)
      const result = options.onDestroy(
        element as HTMLInputElement,
        tagJsVar,
        attrContext,
        (attrContext as HostAttributeContextItem).state,
      )
      removeContextInCycle()
      return result
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
  matchesInjection: MatchesInjection
}
