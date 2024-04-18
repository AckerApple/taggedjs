import { TagSupport } from './TagSupport.class';
import { ValueSubject } from './subject';
/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(tag, subject, // could be tag via result.tag
insertBefore, ownerTag) {
    // first time seeing this tag?
    if (!tag.tagSupport) {
        applyFakeTemplater(tag, ownerTag, subject);
        ownerTag.childTags.push(tag);
    }
    tag.ownerTag = ownerTag;
    tag.buildBeforeElement(insertBefore, {
        counts: { added: 0, removed: 0 },
        forceElement: true,
    });
}
export function applyFakeTemplater(tag, ownerTag, subject) {
    const fakeTemplater = getFakeTemplater();
    tag.tagSupport = new TagSupport(ownerTag.tagSupport, fakeTemplater, // the template is provided via html`` call
    subject);
    fakeTemplater.global.oldest = tag;
    fakeTemplater.global.newest = tag;
    fakeTemplater.tagSupport = tag.tagSupport;
    // asking me to render will cause my parent to render
    tag.ownerTag = ownerTag;
}
function getFakeTemplater() {
    return {
        global: {
            renderCount: 0,
            providers: [],
            context: {},
            subscriptions: [],
            deleted: false,
            newestTemplater: {},
        },
        children: new ValueSubject([]), // no children
        props: {},
        isTag: true,
        isTemplater: false,
        tagged: false,
        wrapper: (() => undefined),
        tagSupport: {},
    };
}
//# sourceMappingURL=processTag.function.js.map