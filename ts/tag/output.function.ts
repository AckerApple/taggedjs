import { AnySupport } from "../index.js"
import { blankHandler } from "../render/dom/attachDomElements.function.js"
import { syncStatesArray } from "../state/syncStates.function.js"
import { getSupportInCycle } from "./getSupportInCycle.function.js"
import { safeRenderSupport } from "./props/alterProp.function.js"


/** Used to call a function that belongs to a calling tag */
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
    const ownerGlobal = ownerSupport.subject.global
    const newestOwner = ownerGlobal.newest

    // sync the new states to the old before the old does any processing
    syncStatesArray(newestOwner.states, ownerSupport.states)

    const c = callback(...args) // call the latest callback

    // sync the old states to the new
    syncStatesArray(ownerSupport.states, newestOwner.states)

    // now render the owner
    const newestOwnerOwner = newestOwner.ownerSupport as AnySupport
    safeRenderSupport(newestOwner, newestOwnerOwner.subject.global.newest as AnySupport)

    return c
  }
}
