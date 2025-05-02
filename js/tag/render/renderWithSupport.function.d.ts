import { AnySupport, SupportContextItem } from '../getSupport.function.js';
/** TODO: This seems to support both new and updates and should be separated? */
export declare function renderWithSupport(newSupport: AnySupport, lastSupport: AnySupport | undefined, // previous (global.newest)
subject: SupportContextItem, // events & memory
ownerSupport?: AnySupport): {
    support: AnySupport;
    wasLikeTags: boolean;
};
