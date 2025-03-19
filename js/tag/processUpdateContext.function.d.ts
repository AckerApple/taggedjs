import { AnySupport } from './getSupport.function.js';
import { ContextItem } from './Context.types.js';
export declare function processUpdateContext(support: AnySupport, context: ContextItem[]): ContextItem[];
/** returns boolean of did render */
export declare function processUpdateOneContext(values: unknown[], // the interpolated values
index: number, context: ContextItem[], ownerSupport: AnySupport): void;
