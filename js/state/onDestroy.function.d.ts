import { tag } from "../TagJsTags/tag.function.js";
export type OnDestroyCallback = () => unknown;
export declare function onDestroy(callback: OnDestroyCallback): typeof tag;
