import { AttributeContextItem, HostAttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { AnySupport, ContextItem, TemplateValue, ValueTypes } from "../tag/index.js"
import { syncWrapCallback } from "../tag/output.function.js"
import { handleTagTypeChangeFrom } from "../tag/update/checkStillSubscription.function.js"
import { removeContextInCycle, setContextInCycle } from "../tag/cycles/setContextInCycle.function.js"
import { MatchesInjection, TagJsVar } from "./tagJsVar.type.js"
import { initState, reState } from "../state/state.utils.js"
import { runAfterRender } from "../render/runAfterRender.function.js"

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
  const baseHost = {
    tagJsType: ValueTypes.host,
    processInitAttribute: processHostAttribute,
    // TODO: maybe a host value can change?
    checkValueChange: () => 0,
    processInit: processHost, // This should be a throw error because only attribute is supported
    processUpdate: processHostUpdate,
    destroy: deleteHost,
    options: { callback, ...options } as AllOptions,
    matchesInjection(inject: any): boolean {
      const injectCallback = inject?.options?.callback
      // Check if the inject target is a host with the same callback
      return injectCallback === callback
    },
  }
  
  const returnFunction = (...args: any[]) => {
    const hostValue = {
      ...returnFunction,
      options: { arguments: args, ...options, callback } as AllOptions,
    }

    return hostValue
  }

  Object.assign(returnFunction, baseHost)
  // returnFunction.options = { callback }

  return returnFunction as any as HostValueFunction<T>
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

  reState(contextItem)

  const args = (newHost.options.arguments || oldOptions.arguments || [])
  contextItem.returnValue = newHost.options.callback(...args)

  runAfterRender()
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
  
  initState(contextItem)

  processHostTagJsVar(
    element as HTMLInputElement,
    tagJsVar as HostValue,
    contextItem,
    state,
  )

  runAfterRender()
}
/** first time run */
function processHostTagJsVar(
  element: HTMLInputElement,
  tagJsVar: HostValue,
  contextItem: ContextItem,
  state: any,
) {
  const args = tagJsVar.options.arguments || []
  const returnValue = tagJsVar.options.callback(...args)
  
  // Store the return value for tag.inject to access
  contextItem.returnValue = returnValue

  // DEPRECATED
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

  if(attrContext.destroy$.subscribers.length) {
    // TODO: Not sure if this needed
    setContextInCycle(contextItem)

    syncWrapCallback(
      [],
      attrContext.destroy$.next.bind(attrContext.destroy$),
      contextItem,
    )
    
    // TODO: Not sure if this needed
    removeContextInCycle()
  }

  // DEPRECATED
  // TODO: remove this code and use tag.onDestroy instead
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
      stateOwner.context,
    )
  }
}

export type HostValue = TagJsVar & {
  tagJsType: typeof ValueTypes.host
  options: AllOptions
  matchesInjection: MatchesInjection
}
