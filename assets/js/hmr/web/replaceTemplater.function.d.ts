import { Support, TaggedFunction } from "taggedjs";
import { HmrImport } from "./hmr";
/**
 *
 * @param {Support} ownerSupport
 * @param {{oldTag: TagComponent, newTag: TagComponent}} param1
 * @param {HmrImport} hmr
 * @returns {Promise<number>}
 */
export declare function replaceTemplater(ownerSupport: Support, { oldTag, newTag }: {
    oldTag: TaggedFunction<any>;
    newTag?: TaggedFunction<any>;
}, hmr: HmrImport, isApp: boolean): Promise<number>;
