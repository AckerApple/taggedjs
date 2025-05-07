import { AnySupport } from '../tag/AnySupport.type.js'
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
  return syncStatesArray(support.states, newestSupport.states)
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

export function syncStates(
  from: StatesSetter,
  onto: StatesSetter,
) {
  let got: any

  from((...x: any) => {
    got = x
    return x as any
  }, 1)

  onto(() => {
    return got
  }, 2)
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
    const oldValues: any[] = []

    const oldGetCallback = <T extends any[]>(...args: [...T]) => {
      oldValues.push(args)
      return args
    }

    const stateFromTarget = statesFrom[index]
    
    // trigger getting all old values
    stateFromTarget( oldGetCallback )
    
    let getIndex = 0

    // This is the "get" argument that will be called and all arguments are ignored
    const newSetCallback = <T extends any[]>(..._: [...T]) => {
      return oldValues[ getIndex++ ]
    }

    // trigger setting updated values
    intoStates[index]( newSetCallback )
  }
}
