import { State } from './state.utils'

export function syncStates(
  stateFrom: State,
  stateTo: State,
) {
  for (let index = stateFrom.length - 1; index >= 0; --index) {
    const state = stateFrom[index]
    const fromValue = state.get()
    const callback = stateTo[index].callback

    if(callback) {
      callback( fromValue ) // set the value
    }
    
    stateTo[index].lastValue = fromValue // record the value
  }
}
