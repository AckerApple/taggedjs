import { State } from './state.types.js'

export function syncStates(
  stateFrom: State,
  stateTo: State,
) {
  for (let index = stateFrom.length - 1; index >= 0; --index) {
    const fromValue = stateFrom[index].get()
    const callback = stateTo[index].callback // is it a let state?
    
    if(!callback) {
      continue
    }  
    
    callback( fromValue ) // set the value
  }
}
