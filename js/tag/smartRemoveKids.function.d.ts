import { AnySupport } from './getSupport.function.js';
import { SupportTagGlobal } from './getTemplaterResult.function.js';
/** sets global.deleted on support and all children */
export declare function smartRemoveKids(support: AnySupport, global: SupportTagGlobal, allPromises: Promise<any>[]): void;
