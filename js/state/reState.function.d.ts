import { AnySupport, ContextItem } from '../tag/index.js';
import { State } from './state.types.js';
export declare function reState(context: ContextItem): import("./StateMemory.type.js").StateMemory;
export declare function reStateByPrev(prevState: State): import("./StateMemory.type.js").StateMemory;
export declare function reStateSupport(newSupport: AnySupport, prevSupport: AnySupport, prevState: State): void;
