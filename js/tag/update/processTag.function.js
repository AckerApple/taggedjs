import { getHtmlSupport } from '../Support.class.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { paintAppends } from '../paint.function.js';
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js';
import { buildBeforeElement } from '../buildBeforeElement.function.js';
import { checkTagValueChange } from '../checkDestroyPrevious.function.js';
/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(ownerSupport, // owner
subject) {
    const global = subject.global;
    const support = global.newest;
    support.ownerSupport = ownerSupport;
    subject.checkValueChange = checkTagValueChange;
    const ph = subject.placeholder;
    const result = buildBeforeElement(support, undefined, ph, { counts: { added: 0, removed: 0 } });
    for (const sub of result.subs) {
        subscribeToTemplate(sub);
    }
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
        tagJsType: ValueTypes.templater,
    };
    return fake;
}
/** Create Support for a tag component */
export function newSupportByTemplater(templater, ownerSupport, subject) {
    const support = getHtmlSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const global = subject.global;
    global.context = [];
    return support;
}
export function processNewTag(templater, ownerSupport, // owner
subject, // could be tag via result.tag
appendTo) {
    subject.checkValueChange = checkTagValueChange;
    const support = newSupportByTemplater(templater, ownerSupport, subject);
    support.ownerSupport = ownerSupport;
    const result = buildBeforeElement(support, appendTo, undefined, { counts: { added: 0, removed: 0 } });
    for (const dom of result.dom) {
        if (dom.marker) {
            paintAppends.push({
                element: dom.marker,
                relative: appendTo, // ph.parentNode as Element,
            });
        }
        if (dom.domElement) {
            paintAppends.push({
                element: dom.domElement,
                relative: appendTo, // ph.parentNode as Element,
            });
        }
    }
    let index = -1;
    const length = result.subs.length - 1;
    //++painting.locks
    while (index++ < length) {
        const sub = result.subs[index];
        subscribeToTemplate(sub);
    }
    return support;
}
//# sourceMappingURL=processTag.function.js.map