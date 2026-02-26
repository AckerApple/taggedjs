/** client code */
import { renderWithSupport, renderSupport, firstTagRender, reRenderTag, paint } from "taggedjs";
/**
 * @typedef {import("taggedjs").firstTagRender} firstTagRender
 * @typedef {import("taggedjs").reRenderTag} reRenderTag
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").TagWrapper} TagWrapper
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").Support} Support
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderSupport} renderSupport
 * @typedef {import("taggedjs").paint} paint
 */
/** @typedef {{paint: paint, reRenderTag: reRenderTag, firstTagRender: firstTagRender, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */
export type HmrImport = {
    paint: typeof paint;
    firstTagRender: typeof firstTagRender;
    reRenderTag: typeof reRenderTag;
    renderSupport: typeof renderSupport;
    renderWithSupport: typeof renderWithSupport;
};
