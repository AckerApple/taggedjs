import { firstLetState, reLetState } from './letState.function.js';
import { runFirstState, runRestate } from './stateHandlers.js';
import { setUseMemory } from './setUse.function.js';
export function afterRender(support) {
    const config = setUseMemory.stateConfig;
    // TODO: only needed in development
    /*
    const rearray = config.rearray as unknown as State[]
    if(rearray.length && rearray.length !== config.array.length) {
      const message = `States lengths have changed ${rearray.length} !== ${config.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`
      const wrapper = support.templater?.wrapper as Wrapper
      const details = {
        oldStates: config.array,
        newStates: config.rearray,
        tagFunction: wrapper.parentWrap.original,
      }
      const error = new StateMismatchError(message,details)
      console.warn(message,details)
      throw error
    }
    */
    delete config.support;
    support.state = config.array;
    config.array = [];
}
export function initState(support, config) {
    config.handlers.handler = runFirstState;
    config.handlers.letHandler = firstLetState;
    config.rearray = [];
    config.support = support;
}
export function reState(support, config) {
    const state = support.state;
    config.rearray = state;
    config.handlers.handler = runRestate;
    config.handlers.letHandler = reLetState;
    config.support = support;
}
export class StateEchoBack {
}
// sends a fake value and then sets back to received value
export function getCallbackValue(callback) {
    const oldState = callback(StateEchoBack); // get value and set to undefined
    const [value] = oldState;
    const [checkValue] = callback(value); // set back to original value
    return [value, checkValue];
}
//# sourceMappingURL=state.utils.js.map