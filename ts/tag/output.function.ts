import { AnySupport, ContextItem, paint } from "../index.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { paintAfters, painting } from "../render/paint.function.js"
import { syncStatesArray } from "../state/syncStates.function.js"
import { getSupportInCycle } from "./cycles/getSupportInCycle.function.js"
import { safeRenderSupport } from "./props/safeRenderSupport.function.js"
import { ContextStateMeta, ContextStateSupport } from "./ContextStateMeta.type.js"


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
      args, callback, ownerSupport.context,
    )
  }
}

export function syncWrapCallback(
  args: any[],
  callback: any,
  context: ContextItem, // aka stateOwner
) {
  const stateMeta = context.state as ContextStateMeta
  const newerStates = (stateMeta.newer as ContextStateSupport).states
  const olderStates = stateMeta.older ? (stateMeta.older as ContextStateSupport).states : newerStates
  const newestOwner = stateMeta.newest as AnySupport

  // sync the new states to the old before the old does any processing
  syncStatesArray(newerStates, olderStates)

  const c = callback(...args) // call the latest callback


  // sync the old states to the new
  syncStatesArray(olderStates, newerStates)

  // now render the owner
  paintAfters.push([() => {
    const newGlobal = newestOwner.context.global
    const ignore = newGlobal === undefined || newGlobal.deleted === true
    
    if( ignore ) {
      return // its not a tag anymore
    }

    ++painting.locks
    safeRenderSupport(newestOwner)
    --painting.locks

    paint()
  }, []])

  return c
}