import { State, StateConfigItem } from './state.utils'

export function syncStates(
  stateFrom: State,
  stateTo: State,
) {
  for (let index = stateFrom.length - 1; index >= 0; --index) {
    const state = stateFrom[index]
    const fromValue = state.get()
    const s = stateTo[index]
    setState(s, fromValue)
  }
}

function setState(
  s: StateConfigItem<any>,
  fromValue: any,
) {
  const callback = s.callback

  if(callback) {
    callback( fromValue ) // set the value
  }
}
