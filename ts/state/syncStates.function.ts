import { AnySupport } from '../tag/AnySupport.type.js'
import { ContextStateSupport, ContextStateMeta } from '../tag/ContextStateMeta.type.js'
import { State } from './state.types.js'
import { StatesSetter } from './states.utils.js'

/**
 * Sync two supports
 * @param support FROM
 * @param newestSupport  ONTO
 * @returns 
 */
export function syncSupports(
  support: AnySupport, // from
  newestSupport: AnySupport, // onto
) {
  const stateMeta = support.context.state as ContextStateMeta
  const newestStateMeta = newestSupport.context.state as ContextStateMeta
  const fromStates = (stateMeta.newer as ContextStateSupport).states
  const toStates = (newestStateMeta.newer as ContextStateSupport).states
  return syncStatesArray(fromStates, toStates)
}

export function syncStatesArray(
  from: StatesSetter[],
  onto: StatesSetter[],
) {
  for (let index=0; index < from.length; ++index) {
    const getter = from[index]
    const setter = onto[index]
    
    syncStates(getter, setter)
  }
}

let got: any
function syncFromState(...x: any) {
  got = x
  return x as any
}
function syncOntoState() {
  return got
}

export function syncStates(
  from: StatesSetter,
  onto: StatesSetter,
) {
  from(syncFromState, 1)
  onto(syncOntoState, 2)
}

/** @deprecated favor using syncSupports */
export function oldSyncStates(
  stateFrom: State,
  stateTo: State,
  intoStates: StatesSetter[],
  statesFrom: StatesSetter[],
) {
  for (let index = stateFrom.length - 1; index >= 0; --index) {
    const stateFromTarget = stateFrom[index]
    
    const fromValue = stateFromTarget.get() // get without setting
    // const fromValue = getStateValue(stateFromTarget) // get without setting

    const stateToTarget = stateTo[index]
    const callback = stateToTarget.callback // is it a let state?
    
    if(!callback) {
      continue
    }
    
    callback( fromValue ) // set the value
  }

  // loop statesFrom to set on the oldStates
  for (let index = statesFrom.length - 1; index >= 0; --index) {
    oldValues.length = 0
    getIndex = 0

    const stateFromTarget = statesFrom[index]

    // trigger getting all old values
    stateFromTarget( oldGetCallback )

    // trigger setting updated values
    intoStates[index]( newSetCallback )
  }
}

let getIndex = 0
const oldValues: any[] = []

function oldGetCallback<T extends any[]>(...args: [...T]) {
  oldValues.push(args)
  return args
}

// This is the "get" argument that will be called and all arguments are ignored
function newSetCallback <T extends any[]>(..._: [...T]) {
  return oldValues[ getIndex++ ]
}
