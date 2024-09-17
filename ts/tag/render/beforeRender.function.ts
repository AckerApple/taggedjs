import { initState, reState } from '../../state/state.utils.js'
import { setUseMemory } from '../../state/setUse.function.js'
import { BaseSupport, Support } from '../Support.class.js'
import { State } from '../../state/state.types.js'

export function beforeRender(
  support: BaseSupport | Support, // new
  prevState?: State,
) {
  // ++support.subject.renderCount

  if(prevState) {
    const lastState = prevState
    support.state = lastState

    reState(support, setUseMemory.stateConfig)
    return
  }

  // first time render
  initState(support, setUseMemory.stateConfig)
}
