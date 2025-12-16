import { SupportContextItem } from '../tag/SupportContextItem.type.js';
import { AnySupport } from '../tag/index.js';
export declare function reRenderTag(newSupport: AnySupport, prevSupport: AnySupport | undefined, // causes restate
context: SupportContextItem, ownerSupport?: AnySupport): AnySupport;
/** Used during first renders of a support */
export declare function firstTagRender(newSupport: AnySupport, prevSupport: AnySupport | undefined, // causes restate
context: SupportContextItem, ownerSupport?: AnySupport): AnySupport;
export declare function getSupportOlderState(support?: AnySupport): import("../index.js").State | undefined;
