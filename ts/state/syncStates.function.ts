import { State } from './state.types.js'
import { StatesSetter } from './states.utils.js'

export function syncStates(
  stateFrom: State,
  stateTo: State,
  oldStates: StatesSetter[],
  statesFrom: StatesSetter[],
) {
  // sync state() and letState()
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

    const oldGetCallback = <T>(oldValue: T) => {
      oldValues.push(oldValue)
      return oldValue
    }

    
    // trigger getting all old values
    statesFrom[index]( oldGetCallback )
    
    let getIndex = 0
    const newSetCallback = <T>(_: T) => {
      return oldValues[ getIndex++ ]
    }

    // trigger setting updated values
    oldStates[index]( newSetCallback )    
  }
}
