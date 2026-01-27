import { StatesSetter } from './states.utils.js'

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
