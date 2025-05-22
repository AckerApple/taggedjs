import { Props } from '../../Props.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { SupportContextItem } from '../../tag/SupportContextItem.type.js';
export declare function updateExistingTagComponent(ownerSupport: AnySupport, support: AnySupport, // lastest
subject: SupportContextItem): void;
export declare function syncFunctionProps(newSupport: AnySupport, lastSupport: AnySupport, ownerSupport: AnySupport, newPropsArray: unknown[], // templater.props
maxDepth: number, depth?: number): Props;
export declare function moveProviders(lastSupport: AnySupport, newSupport: AnySupport): void;
