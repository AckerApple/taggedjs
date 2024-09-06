import { AnySupport, BaseSupport, Support } from '../Support.class.js';
import { Props } from '../../Props.js';
import { ContextItem } from '../Context.types.js';
export declare function updateExistingTagComponent(ownerSupport: BaseSupport | Support, support: AnySupport, // lastest
subject: ContextItem): void;
export declare function syncFunctionProps(newSupport: AnySupport, lastSupport: AnySupport, ownerSupport: BaseSupport | Support, newPropsArray: any[], // templater.props
maxDepth: number, depth?: number): Props;
export declare function moveProviders(lastSupport: Support, newSupport: AnySupport): void;
