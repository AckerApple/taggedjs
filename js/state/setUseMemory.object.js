import { firstStatesHandler } from './states.utils.js';
import { runFirstState } from './stateHandlers.js';
import { tagClosed$ } from './tagClosed$.subject.js';
export const setUseMemory = {
    stateConfig: {
        state: [], // state memory on the first render
        version: Date.now(),
        handlers: {
            handler: runFirstState,
            statesHandler: firstStatesHandler,
        }
    },
    tagClosed$,
};
//# sourceMappingURL=setUseMemory.object.js.map