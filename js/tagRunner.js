// TODO: This should be more like `new TaggedJs().use({})`
import { setUse } from './state';
import { Subject } from './subject';
// Emits event at the end of a tag being rendered. Use tagClosed$.toPromise() to render a tag after a current tag is done rendering
export const tagClosed$ = new Subject(undefined, subscription => {
    if (!setUse.memory.stateConfig.rearray) {
        subscription.next(); // we are not currently processing so process now
    }
});
// Life cycle 1
export function runBeforeRender(tagSupport, tagOwner) {
    setUse.tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, tagOwner));
}
// Life cycle 2
export function runAfterRender(tagSupport, tag) {
    setUse.tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, tag));
    tagClosed$.next(tag);
}
// Life cycle 3
export function runBeforeRedraw(tagSupport, tag) {
    setUse.tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, tag));
}
// Life cycle 4 - end of life
export function runBeforeDestroy(tagSupport, tag) {
    setUse.tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, tag));
}
//# sourceMappingURL=tagRunner.js.map