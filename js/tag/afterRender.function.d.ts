import { AnySupport } from './getSupport.function.js';
/** Compares states of previous renders
 * @property support - The workflow that supports a single tag
 * @property ownerSupport - undefined when "support" is the app element
 */
export declare function runAfterRender(support: AnySupport, ownerSupport?: AnySupport): void;
