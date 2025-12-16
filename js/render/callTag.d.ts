import { SupportContextItem } from '..';
import { AnySupport } from '../tag';
export declare function callTag(newSupport: AnySupport, prevSupport: AnySupport | undefined, // causes restate
context: SupportContextItem, ownerSupport?: AnySupport): AnySupport;
