import { AnySupport, ContextItem, ContextStateSupport } from '../tag/index.js';
import { ContextStateMeta } from '../tag/ContextStateMeta.type.js';
import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { setContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { setUseMemory } from './setUseMemory.object.js';
import { State } from './state.types.js';
import { runRestate } from './stateHandlers.js';
import { reStatesHandler } from './states.utils.js';

export function reState(
  context: ContextItem
) {
  setContextInCycle(context);
  const stateMeta = context.state as ContextStateMeta;
  return reStateByPrev((stateMeta.newer as ContextStateSupport).state);
}

export function reStateByPrev(
  prevState: State,
) {
  const config = setUseMemory.stateConfig

  // set previous state memory
  config.rearray = prevState

  config.state = []
  config.states = []
  config.statesIndex = 0
  
  config.handlers.handler = runRestate
  config.handlers.statesHandler = reStatesHandler

  return config
}

export function reStateSupport(
  newSupport: AnySupport,
  prevSupport: AnySupport,
  prevState: State,
) {
  reStateByPrev(prevState)
  
  const config = setUseMemory.stateConfig
  config.prevSupport = prevSupport

  setSupportInCycle(newSupport)
}
