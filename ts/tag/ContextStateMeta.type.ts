import { AnySupport } from '../index.js'
import { State } from '../state/index.js'
import { StatesSetter } from '../state/states.utils.js'

export interface ContextStateSupport {
  state: State
  states: StatesSetter[]
}

export interface ContextStateMeta {
  oldest?: AnySupport
  newest?: AnySupport
  older?: ContextStateSupport
  newer?: ContextStateSupport
}