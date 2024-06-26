import { afterElmBuild } from '../../interpolations/interpolateTemplate.js';
import { Support } from '../Support.class.js';
import { ValueSubject } from '../../subject/index.js';
/** When first time render, adds to owner childTags */
export function processTag(templater, ownerSupport, // owner
subject) {
    let support = subject.support;
    // first time seeing this tag?
    if (!support) {
        support = newSupportByTemplater(templater, ownerSupport, subject);
    }
    subject.support = support;
    support.ownerSupport = ownerSupport;
    const newFragment = support.buildBeforeElement(undefined, { counts: { added: 0, removed: 0 } });
    const children = [...newFragment.children];
    const placeholder = subject.global.placeholder;
    const parentNode = placeholder.parentNode;
    parentNode.insertBefore(newFragment, placeholder);
    afterChildrenBuilt(children, subject, ownerSupport);
    return support;
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
        html: () => fake,
        dom: () => fake,
        key: () => fake,
    };
    return fake;
}
/** Create Support for a tag component */
export function newSupportByTemplater(templater, ownerSupport, subject) {
    const support = new Support(templater, ownerSupport, subject);
    setupNewSupport(support, ownerSupport, subject);
    ownerSupport.subject.global.childTags.push(support);
    return support;
}
export function setupNewSupport(support, ownerSupport, subject) {
    support.subject = subject;
    subject.global.oldest = support;
    subject.global.newest = support;
    // asking me to render will cause my parent to render
    support.ownerSupport = ownerSupport;
}
export function afterChildrenBuilt(children, subject, ownerSupport) {
    children.forEach(x => afterElmBuild(x, { counts: { added: 0, removed: 0 } }, subject.global.context, ownerSupport));
}
//# sourceMappingURL=processTag.function.js.map