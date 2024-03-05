import { runAfterRender, runBeforeRedraw } from "./tagRunner.js";
export function updateExistingTag(templater, ogTag, existingSubject) {
    const tagSupport = ogTag.tagSupport;
    const oldest = tagSupport.oldest;
    const newest = tagSupport.newest;
    runBeforeRedraw(oldest.tagSupport, newest || oldest);
    const retag = templater.wrapper();
    templater.newest = retag;
    tagSupport.newest = retag;
    runAfterRender(oldest.tagSupport, oldest);
    ogTag.updateByTag(retag);
    existingSubject.set(templater);
    return [];
}
//# sourceMappingURL=updateExistingTag.function.js.map