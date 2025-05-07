import { createHtmlSupport } from '../createHtmlSupport.function.js';
import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { buildBeforeElement } from '../buildBeforeElement.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { processTagInit } from './processTagInit.function.js';
/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(ownerSupport, // owner
subject, // could be tag via result.tag
counts) {
    const global = subject.global;
    const support = global.newest;
    support.ownerSupport = ownerSupport;
    subject.checkValueChange = checkTagValueChange;
    const ph = subject.placeholder;
    buildBeforeElement(support, counts, undefined, ph);
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
        processInit: processTagInit,
    };
    return fake;
}
/** Create support for a tag component */
export function newSupportByTemplater(templater, ownerSupport, subject) {
    const support = createHtmlSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const global = subject.global;
    global.context = [];
    return support;
}
//# sourceMappingURL=processTag.function.js.map