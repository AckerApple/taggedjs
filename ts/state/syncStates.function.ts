import { AnySupport } from '../tag/getSupport.function.js'
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

  for (let index=0; index < support.states.length; ++index) {
    let got: any
    const getter = support.states[index]
    const setter = newestSupport.states[index]
    
    getter((...x: any) => {
      got = x
      return x as any
    })

    setter(() => {
      return got
    })
  }

  return
}

/** @deprecated favor using syncSupports */
export function syncStates(
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
