import { BaseSupport, Support } from '../Support.class.js';
/** Main function used by all other callers to render/update display of a tag component */
export declare function renderSupport<T extends Support | BaseSupport>(support: T, // must be latest/newest state render
renderUp: boolean): T;
