import { htmlTag, a } from "taggedjs";
const h2 = htmlTag("h2");
const h3 = htmlTag("h3");
const span = htmlTag("span");
function copyHashToClipboard(id) {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return;
    }
    const url = new URL(window.location.href);
    url.hash = id;
    if (!navigator.clipboard?.writeText) {
        return;
    }
    void navigator.clipboard.writeText(url.toString());
}
function titleLink(id, label) {
    return a
        .class `doc-title-link`
        .href `#${id}`
        .onClick(() => copyHashToClipboard(id))(label);
}
export function docH2(id, label) {
    return h2.class `doc-title`(titleLink(id, label));
}
export function docH3(id, label) {
    return h3.class `doc-subtitle`.id(id)(titleLink(id, label));
}
//# sourceMappingURL=docHeading.js.map