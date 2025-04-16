import { State } from './state.types.js'
import { StatesSetter } from './states.utils.js'

export function syncStates(
  stateFrom: State,
  stateTo: State,
  oldStates: StatesSetter[],
  statesFrom: StatesSetter[],
) {
  // sync state()
  for (let index = stateFrom.length - 1; index >= 0; --index) {
    const fromValue = stateFrom[index].get()
    const callback = stateTo[index].callback // is it a let state?
    
    if(!callback) {
      continue
    }  
    
    callback( fromValue ) // set the value
  }

  for (let index = statesFrom.length - 1; index >= 0; --index) {
    const oldValues: any[] = []

    const oldGetCallback = <T extends any[]>(...args: [...T]) => {
      oldValues.push(args)
      return args
    }

    
    // trigger getting all old values
    statesFrom[index]( oldGetCallback )
    
    let getIndex = 0
    const newSetCallback = <T extends any[]>(..._: [...T]) => {
      return oldValues[ getIndex++ ]
    }

    // trigger setting updated values
    oldStates[index]( newSetCallback )    
  }
}
