import { ValueSubject } from "./ValueSubject";
import { bindSubjectCallback } from "./bindSubjectCallback.function";
export function getSubjectFunction(value, tag) {
    return new ValueSubject(bindSubjectCallback(value, tag));
}
export function setValueRedraw(templater, // latest tag function to call for rendering
existing, ownerTag) {
    // redraw does not communicate to parent
    templater.redraw = () => {
        const existingTag = templater.oldest || existing.tag;
        const tagSupport = existingTag?.tagSupport || templater.tagSupport;
        const { retag } = templater.renderWithSupport(tagSupport, existingTag, ownerTag);
        existing.set(templater);
        return retag;
    };
}
//# sourceMappingURL=Tag.utils.js.map