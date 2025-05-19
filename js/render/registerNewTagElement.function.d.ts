import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { TagMaker } from '../tag/TagMaker.type.js';
import { AnySupport, BaseTagGlobal } from '../index.js';
export declare function registerTagElement(support: AnySupport, element: Element | HTMLElement, global: BaseTagGlobal, templater: TemplaterResult, app: TagMaker, placeholder: Text): DocumentFragment;
