import { State } from '../state/index.js'
import { StatesSetter } from '../state/states.utils.js'
import { BaseSupport } from './BaseSupport.type.js'

export type AnySupport = (BaseSupport & {
  state: State
  states: StatesSetter[]
})
