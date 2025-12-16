import { AnySupport } from '../index.js';
import { ContextItem } from '../tag/index.js';
import { ElementVar } from './designElement.function.js';
/** The first and recursive processor for elements */
export declare function processElementVar(value: ElementVar, context: ContextItem, ownerSupport: AnySupport, _addedContexts: ContextItem[]): HTMLElement;
