import { AnySupport, BaseSupport, Support } from '../Support.class.js';
import { ContextItem } from '../Context.types.js';
export declare function renderExistingReadyTag(lastSupport: AnySupport, newSupport: AnySupport, // new to be rendered
ownerSupport: BaseSupport | Support, // ownerSupport
subject: ContextItem): AnySupport;
