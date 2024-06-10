/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 */
import { TagSubject, TaggedFunction } from "taggedjs";
/** @typedef {{renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */
/**
 * Used to switch out the wrappers of a subject and then render
 * @param {*} contextSubject
 * @param {TagComponent} newTag
 * @param {TagComponent} oldTag
 * @param {HmrImport} hmr
 */
export declare function updateSubject(contextSubject: TagSubject, newTag: TaggedFunction<any>, oldTag: TaggedFunction<any>, hmr: any): Promise<void>;
