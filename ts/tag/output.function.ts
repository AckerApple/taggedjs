import { AnySupport, paint } from "../index.js"
import { blankHandler } from "../render/dom/attachDomElements.function.js"
import { syncStatesArray } from "../state/syncStates.function.js"
import { getSupportInCycle } from "./getSupportInCycle.function.js"
import { safeRenderSupport } from "./props/safeRenderSupport.function.js"


/** Used to call a function that belongs to a calling tag but is not with root arguments */
export function output<CallbackReturn, ReceivedArguments extends any[]>(
  callback: ((...args: any[]) => CallbackReturn),
): (...args: ReceivedArguments) => CallbackReturn {
  if(!callback) {
    return blankHandler as any // output used on an argument that was not passed in
  }

  const support = getSupportInCycle() as AnySupport
  if(!support) {
    throw new Error('output must be used in render sync fashion')
  }

  return (...args: any[]) => {
    const ownerSupport = support.ownerSupport as AnySupport

    return syncWrapCallback(
      args, callback, ownerSupport,
    )
  }
}

export function syncWrapCallback(
  args: any[],
  callback: any,
  ownerSupport: AnySupport,
) {
  const newestOwner = ownerSupport.subject.global.newest
  
  // sync the new states to the old before the old does any processing
  syncStatesArray(newestOwner.states, ownerSupport.states)

  const c = callback(...args) // call the latest callback

  // sync the old states to the new
  syncStatesArray(ownerSupport.states, newestOwner.states)

  // now render the owner
  safeRenderSupport(newestOwner)

  paint()

  return c
}