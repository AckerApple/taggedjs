import { AnySupport } from './getSupport.function.js';
import { Context } from './Context.types.js';
export declare function processUpdateContext(support: AnySupport, context: Context): Context;
/** returns boolean of did render */
export declare function processUpdateOneContext(values: unknown[], // the interpolated values
index: number, context: Context, ownerSupport: AnySupport): void;
