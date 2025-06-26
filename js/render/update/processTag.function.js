import { createHtmlSupport } from '../../tag/createHtmlSupport.function.js';
import { checkTagValueChange } from '../../tag/checkTagValueChange.function.js';
import { buildBeforeElement } from '../buildBeforeElement.function.js';
import { ValueTypes } from '../../tag/ValueTypes.enum.js';
import { processTagInit } from '../../tag/update/processTagInit.function.js';
/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(ownerSupport, // owner
contextItem, // could be tag via result.tag
counts) {
    const global = contextItem.global;
    const support = global.newest;
    const ph = contextItem.placeholder;
    support.ownerSupport = ownerSupport;
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
        checkValueChange: checkTagValueChange,
    };
    return fake;
}
/** Create support for a tag component */
export function newSupportByTemplater(templater, ownerSupport, subject) {
    const support = createHtmlSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const global = subject.global;
    global.contexts = [];
    return support;
}
//# sourceMappingURL=processTag.function.js.map