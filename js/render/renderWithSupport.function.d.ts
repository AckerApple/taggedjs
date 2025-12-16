import { AnySupport } from '../tag/index.js';
import { SupportContextItem } from '../tag/SupportContextItem.type.js';
/** TODO: This seems to support both new and updates and should be separated? */
export declare function renderWithSupport(newSupport: AnySupport, lastSupport: AnySupport | undefined, // previous (global.newest)
context: SupportContextItem): {
    support: AnySupport;
    wasLikeTags: boolean;
};
