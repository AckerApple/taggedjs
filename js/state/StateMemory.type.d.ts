import { AnySupport } from "../tag/AnySupport.type.js";
import { State } from "./state.types.js";
import { runFirstState } from "./stateHandlers.js";
import { firstStatesHandler, StatesSetter } from "./states.utils.js";
export type StateMemory = {
    version: number;
    support?: AnySupport;
    prevSupport?: AnySupport;
    /** state memory on the first render */
    stateArray: State;
    /** let states */
    states: StatesSetter[];
    statesIndex: number;
    rearray?: State;
    handlers: {
        handler: typeof runFirstState;
        statesHandler: typeof firstStatesHandler;
    };
};
