import { Subject } from '../subject/Subject.class.js'
import { AnySupport } from '../tag/Support.class.js'
import { firstLetState } from './letState.utils.js'
import { firstStatesHandler } from './states.utils.js'
import { State } from './state.types.js'
import { runFirstState } from './stateHandlers.js'
import { StateMemory } from './StateMemory.type.js'

export type UseOptions = {
  beforeRender?: (
    support: AnySupport,
    ownerTag?: AnySupport, // not defined on tagElement app
  ) => void
  beforeRedraw?: (support: AnySupport, tag: AnySupport) => void
  afterRender?: (support: AnySupport, ownerSupport?: AnySupport) => void
  beforeDestroy?: (support: AnySupport, tag: AnySupport) => void
}

export const setUseMemory = {
  stateConfig: {
    stateArray: [] as State, // state memory on the first render
    version: Date.now(),
    handlers: {
      handler: runFirstState,
      letHandler: firstLetState,
      statesHandler: firstStatesHandler,
    }
  },
} as UseMemory

export type UseMemory = (Record<string, unknown> & {
  stateConfig: StateMemory
  currentSupport: AnySupport // tag being rendered
  tagClosed$: Subject<AnySupport>
})
