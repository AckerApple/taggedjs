import { reState } from '../../state/state.utils.js'
import { setUseMemory } from '../../state/setUse.function.js'
import { AnySupport } from '../Support.class.js'
import { State } from '../../state/state.types.js'

export function beforeRerender(
  support: AnySupport, // new
  prevState: State,
) {
  reState(support, setUseMemory.stateConfig, prevState)
  return
}
