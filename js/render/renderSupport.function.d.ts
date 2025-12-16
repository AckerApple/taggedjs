import { AnySupport } from '../tag/index.js';
import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
export declare function isInlineHtml(templater: TemplaterResult): boolean;
/** Main function used by all other callers to render/update display of a tag component */
export declare function renderSupport<T extends AnySupport>(support: T): T;
/** Renders the owner of the inline HTML even if the owner itself is inline html */
export declare function renderInlineHtml(support: AnySupport): AnySupport;
