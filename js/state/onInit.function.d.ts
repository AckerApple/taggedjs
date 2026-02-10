import { tag } from '../TagJsTags/tag.function.js';
export type OnInitCallback = () => unknown;
/** Used for knowing when html elements have arrived on page */
export declare function onInit(callback: OnInitCallback): typeof tag;
