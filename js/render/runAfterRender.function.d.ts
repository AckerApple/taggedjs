import { AnySupport, ContextItem } from '../tag/index.js';
/** Compares states of previous renders
 * @property support - The workflow that supports a single tag
 * @property ownerSupport - undefined when "support" is the app element
 */
export declare function runAfterSupportRender(support: AnySupport, ownerSupport?: AnySupport): void;
/** run after rendering anything with state */
export declare function runAfterRender(context: ContextItem): void;
export declare function clearStateConfig(): void;
