import { runAfterRender, runBeforeRedraw } from './tagRunner';
export function updateExistingTag(templater, ogTag, existingSubject) {
    if (!templater.tagSupport) {
        throw new Error('start clone tag support here');
    }
    console.log('redraw templater!!!!', { wrapp: templater.wrapper?.original });
    templater.render();
    return;
    const tagSupport = ogTag.tagSupport;
    const oldest = templater.global.oldest;
    const newest = templater.global.newest;
    // runBeforeRedraw(oldest.tagSupport, newest || oldest)
    runBeforeRedraw(oldest.tagSupport, oldest);
    const wrapTagSupport = tagSupport; // newest.tagSupport || tagSupport
    // const retag = templater.wrapper(wrapTagSupport)
    const retag = templater.wrapper(wrapTagSupport);
    templater.global.newest = retag;
    runAfterRender(oldest.tagSupport, oldest);
    ogTag.updateByTag(retag);
    // oldest.updateByTag(retag)
    existingSubject.set(templater);
    return [];
}
//# sourceMappingURL=updateExistingTag.function.js.map