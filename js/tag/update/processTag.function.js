import { TagSupport } from '../TagSupport.class.js';
import { ValueSubject } from '../../subject/index.js';
/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(templater, insertBefore, ownerSupport, // owner
subject) {
    let tagSupport = subject.tagSupport;
    // first time seeing this tag?
    if (!tagSupport) {
        tagSupport = newTagSupportByTemplater(templater, ownerSupport, subject);
    }
    subject.tagSupport = tagSupport;
    tagSupport.ownerTagSupport = ownerSupport;
    tagSupport.buildBeforeElement(insertBefore, {
        counts: { added: 0, removed: 0 },
    });
}
export function tagFakeTemplater(tag) {
    const templater = getFakeTemplater();
    templater.tag = tag;
    tag.templater = templater;
    return templater;
}
export function getFakeTemplater() {
    const fake = {
        children: new ValueSubject([]), // no children
        // props: {} as Props,
        props: [],
        isTag: true,
        tagJsType: 'templater',
        tagged: false,
        madeChildIntoSubject: false, // TODO this can be removed
        html: () => fake,
        key: () => fake,
    };
    return fake;
}
/** Create TagSupport for a tag component */
export function newTagSupportByTemplater(templater, ownerSupport, subject) {
    const tagSupport = new TagSupport(templater, ownerSupport, subject);
    setupNewSupport(tagSupport, ownerSupport, subject);
    ownerSupport.childTags.push(tagSupport);
    return tagSupport;
}
export function setupNewSupport(tagSupport, ownerSupport, subject) {
    tagSupport.global.oldest = tagSupport;
    tagSupport.global.newest = tagSupport;
    // asking me to render will cause my parent to render
    tagSupport.ownerTagSupport = ownerSupport;
    subject.tagSupport = tagSupport;
}
//# sourceMappingURL=processTag.function.js.map