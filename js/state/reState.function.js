import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { setContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { setUseMemory } from './setUseMemory.object.js';
import { runRestate } from './stateHandlers.js';
import { reStatesHandler } from './states.utils.js';
export function reState(context) {
    setContextInCycle(context);
    const stateMeta = context.state;
    return reStateByPrev(stateMeta.newer.state);
}
export function reStateByPrev(prevState) {
    const config = setUseMemory.stateConfig;
    // set previous state memory
    config.rearray = prevState;
    config.state = [];
    config.states = [];
    config.statesIndex = 0;
    config.handlers.handler = runRestate;
    config.handlers.statesHandler = reStatesHandler;
    return config;
}
export function reStateSupport(newSupport, prevSupport, prevState) {
    reStateByPrev(prevState);
    const config = setUseMemory.stateConfig;
    config.prevSupport = prevSupport;
    setSupportInCycle(newSupport);
}
//# sourceMappingURL=reState.function.js.map