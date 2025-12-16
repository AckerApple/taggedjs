import { SupportContextItem } from '../tag/SupportContextItem.type.js';
import { AnySupport } from '../tag/index.js';
export declare function callTag(newSupport: AnySupport, prevSupport: AnySupport | undefined, // causes restate
context: SupportContextItem, ownerSupport?: AnySupport): AnySupport;
