import { AnySupport } from "../tag/index.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { ContextItem } from "../tag/ContextItem.type.js";
import { State } from "./state.types.js";
import { runFirstState } from "./stateHandlers.js";
import { firstStatesHandler, StatesSetter } from "./states.utils.js";
export type StateMemory = {
    version: number;
    support?: AnySupport;
    prevSupport?: AnySupport;
    context?: AttributeContextItem | ContextItem;
    /** state memory on the first render */
    state: State;
    /** let states */
    states: StatesSetter[];
    statesIndex: number;
    rearray?: State;
    handlers: {
        handler: typeof runFirstState;
        statesHandler: typeof firstStatesHandler;
    };
};
