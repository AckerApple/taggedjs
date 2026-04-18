import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { TagMaker } from '../tag/TagMaker.type.js';
import { AnySupport, TagGlobal } from '../index.js';
/** Only called by renderTagElement */
export declare function registerTagElement(support: AnySupport, _element: Element | HTMLElement, _global: TagGlobal, // TODO: remove
_templater: TemplaterResult, _app: TagMaker, placeholder: Text): DocumentFragment;
