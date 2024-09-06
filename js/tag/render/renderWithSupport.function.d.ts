import { AnySupport, BaseSupport, Support } from '../Support.class.js';
import { ContextItem } from '../Context.types.js';
/** TODO: This seems to support both new and updates and should be separated? */
export declare function renderWithSupport(newSupport: Support | BaseSupport, lastSupport: Support | BaseSupport | undefined, // previous
subject: ContextItem, // events & memory
ownerSupport?: BaseSupport | Support): {
    support: AnySupport;
    wasLikeTags: boolean;
};
