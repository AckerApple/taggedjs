import { StatesSetter } from './states.utils.js'

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
