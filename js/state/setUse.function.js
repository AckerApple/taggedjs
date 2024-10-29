import { firstLetState } from './letState.utils.js';
import { firstStatesHandler } from './states.utils.js';
import { runFirstState } from './stateHandlers.js';
export const setUseMemory = {
    stateConfig: {
        stateArray: [], // state memory on the first render
        version: Date.now(),
        handlers: {
            handler: runFirstState,
            letHandler: firstLetState,
            statesHandler: firstStatesHandler,
        }
    },
};
//# sourceMappingURL=setUse.function.js.map