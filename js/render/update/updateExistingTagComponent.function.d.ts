import { Props } from '../../Props.js';
import { AnySupport } from '../../tag/index.js';
export declare function syncFunctionProps(newSupport: AnySupport, oldSupport: AnySupport, ownerSupport: AnySupport, newPropsArray: unknown[], // templater.props
maxDepth: number, depth?: number): Props;
export declare function moveProviders(oldSupport: AnySupport, newSupport: AnySupport): void;
