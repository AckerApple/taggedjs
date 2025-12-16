import { AnySupport } from '../index.js';
import { WrapRunner } from '../props/alterProp.function.js';
export declare function updateExistingObject(prop: Record<string, WrapRunner>, priorProp: Record<string, WrapRunner>, newSupport: AnySupport, ownerSupport: AnySupport, depth: number, maxDepth: number): Record<string, WrapRunner>;
