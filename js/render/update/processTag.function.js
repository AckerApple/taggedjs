import { createHtmlSupport } from '../../tag/createHtmlSupport.function.js';
import { checkTagValueChangeAndUpdate } from '../../tag/checkTagValueChange.function.js';
import { buildBeforeElement } from '../buildBeforeElement.function.js';
import { ValueTypes } from '../../tag/ValueTypes.enum.js';
import { processTagInit } from '../../tag/update/processTagInit.function.js';
import { blankHandler } from '../dom/blankHandler.function.js';
/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(ownerSupport, // owner
contextItem) {
    const support = contextItem.state.newest;
    const ph = contextItem.placeholder;
    support.ownerSupport = ownerSupport;
    buildBeforeElement(support, undefined, ph);
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
        processInitAttribute: blankHandler,
        processInit: processTagInit,
        processUpdate: blankHandler,
        hasValueChanged: checkTagValueChangeAndUpdate,
        destroy: blankHandler,
        propWatch: 'shallow',
        key: blankHandler,
    };
    return fake;
}
/** Create support for a tag component */
export function newSupportByTemplater(templater, ownerSupport, subject) {
    const support = createHtmlSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    subject.contexts = subject.contexts || [];
    return support;
}
//# sourceMappingURL=processTag.function.js.map