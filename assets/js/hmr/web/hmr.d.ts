/** client code */
import { renderWithSupport, renderSupport, renderTagOnly, paint } from "taggedjs";
/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").TagWrapper} TagWrapper
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").Support} Support
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderSupport} renderSupport
 * @typedef {import("taggedjs").paint} paint
 */
/** @typedef {{paint: paint, renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */
export type HmrImport = {
    paint: typeof paint;
    renderTagOnly: typeof renderTagOnly;
    renderSupport: typeof renderSupport;
    renderWithSupport: typeof renderWithSupport;
};
