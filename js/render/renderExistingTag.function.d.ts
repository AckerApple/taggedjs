import { AnySupport } from '../tag/AnySupport.type.js';
import { SupportContextItem } from '../tag/createHtmlSupport.function.js';
export declare function renderExistingReadyTag(lastSupport: AnySupport, // should be global.newest
newSupport: AnySupport, // new to be rendered
ownerSupport: AnySupport, // ownerSupport
subject: SupportContextItem): AnySupport;
