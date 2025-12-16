import { AnySupport } from '../index.js';
import { WrapRunner } from '../props/alterProp.function.js';
export declare function syncPriorPropFunction(priorProp: WrapRunner, prop: WrapRunner, newSupport: AnySupport, ownerSupport: AnySupport, maxDepth: number, depth: number): WrapRunner | Record<string, WrapRunner> | WrapRunner[];
