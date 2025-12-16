import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { TagMaker } from '../tag/TagMaker.type.js';
import { AnySupport, TagGlobal } from '../index.js';
/** Only called by renderTagElement */
export declare function registerTagElement(support: AnySupport, element: Element | HTMLElement, global: TagGlobal, // TODO: remove
templater: TemplaterResult, app: TagMaker, placeholder: Text): DocumentFragment;
