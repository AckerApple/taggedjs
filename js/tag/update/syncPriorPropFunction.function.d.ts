import { AnySupport } from '../getSupport.function.js';
import { WrapRunner } from '../../alterProp.function.js';
export declare function syncPriorPropFunction(priorProp: WrapRunner, prop: WrapRunner, newSupport: AnySupport, ownerSupport: AnySupport, maxDepth: number, depth: number): WrapRunner | Record<string, WrapRunner> | WrapRunner[];
