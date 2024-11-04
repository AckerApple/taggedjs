import { AnySupport } from "../tag/Support.class.js"
import { firstLetState } from "./letState.utils.js"
import { State } from "./state.types.js"
import { runFirstState } from "./stateHandlers.js"
import { firstStatesHandler, StatesSetter } from "./states.utils.js"

export type StateMemory = {
  version: number
  support?: AnySupport
  prevSupport?: AnySupport
  
  // STATE MEMORIES
  stateArray: State // state memory on the first render
  states: StatesSetter[]
  statesIndex: number
  
  rearray?: State // state memory to be used before the next render
  
  handlers: {
    handler: typeof runFirstState,
    letHandler: typeof firstLetState,
    statesHandler: typeof firstStatesHandler,
  }
}
