import { AnySupport } from '../index.js';
import { ContextItem } from '../tag/index.js';
import { ElementFunction } from './ElementFunction.type.js';
/** The first and recursive processor for elements */
export declare function processElementVar(value: ElementFunction, context: ContextItem, ownerSupport: AnySupport, _addedContexts: ContextItem[]): HTMLElement;
